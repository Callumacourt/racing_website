import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import { sanitiseContactData, validateContactData, sanitiseSponsorData, validateSponsorData, validateInput } from '../../utils/validation';
import { validateEmail } from '../../utils/validators';
import { sendContactEmail, sendSponsorEmail } from '../../services/emailService';
import helmet from 'helmet';
import { sendDailyDigest } from './digest'; 
import { addToMemory, isInMemory } from './memory';
import { addDailyApplication, resetDailyApplications } from './daily';

const app = express();
app.use(helmet());

app.use(cors());
app.use(express.json({limit: '15kb'}));

app.post('/api/contact', async (req, res) => {
    try {
        // Validate input types
        const typeValidation = validateInput(req.body);
        if (!typeValidation.isValid) {
            return res.status(400).json({ success: false, error: typeValidation.error });
        }

        // Sanitise input
        const sanitiseddData = sanitiseContactData(req.body);

        // Validate sanitised data
        const validation = validateContactData(sanitiseddData);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        // Process valid, clean data
        const result = await sendContactEmail(sanitiseddData);
        res.status(200).json({ success: true, emailId: result.data?.id });
        
    } catch (error) {
        console.error('Contact endpoint error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/api/sponsor', async (req, res) => {
    try {
        // Validate input types
        const typeValidation = validateInput(req.body);
        if (!typeValidation.isValid) {
            console.log('Invalid types')
            return res.status(400).json({ success: false, error: typeValidation.error });
        }

        // sanitised input
        const sanitiseddData = sanitiseSponsorData(req.body);

        // Validate sanitised data
        const validation = validateSponsorData(sanitiseddData);
        if (!validation.isValid) {
            console.log('invalid input')
            return res.status(400).json({ success: false, error: validation.error });
        }

        // Process valid and cleaned data
        const result = await sendSponsorEmail(sanitiseddData);
        res.status(200).json({ success: true, emailId: result.data?.id });
        
    } catch (error) {
        console.error('Sponsor endpoint error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/api/apply', async (req, res) => {
  // Validate types
  try {
    const typeValidation = validateInput(req.body);
    if (!typeValidation.isValid) {
      return res.status(400).json({ success: false, error: typeValidation.error });
    }

    // Validate email format
    const email = req.body.email;

    if (!validateEmail(email) || (!/^[A-Za-z0-9._%+-]+@cardiff\.ac\.uk$/i.test(email))) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    // Reject if email in stored memory
    if (await isInMemory(email) === true) {
      return res.status(400).json({ success: false, error: 'Already applied' })
    }

    // Append to daily applications for daily digest and record memory
    addDailyApplication(email, new Date().toISOString());
    addToMemory(email);

    res.status(200).json({ success: true, message: 'Email stored for digest' });
    console.log('Email stored for digest')

  } catch (error) {
    console.log('Apply endpoint error', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/digest', async (req, res) => {
    if (req.query.secret !== process.env.DIGEST_SECRET) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    try {
        await sendDailyDigest();
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Digest failed' });
    }
});

export default app;
