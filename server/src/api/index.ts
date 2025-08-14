import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import { sanitiseContactData, validateContactData, sanitiseSponsorData, validateSponsorData, validateInput } from '../../utils/validation';
import { validateEmail } from '../../utils/validators';
import { sendContactEmail, sendSponsorEmail } from '../../services/emailService';
import helmet from 'helmet';
import fs from 'fs';
import { timeStamp } from 'console';
import { date } from 'zod/v4/classic/iso.cjs';
import { sendDailyDigest } from './digest'; // adjust path as needed
import path from 'path';

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
  try {
    const typeValidation = validateInput(req.body);
    if (!typeValidation.isValid) {
      return res.status(400).json({ success: false, error: typeValidation.error });
    }

    const email = req.body.email;

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    if (!/^[A-Za-z0-9._%+-]+@cardiff\.ac\.uk$/i.test(email)) {
      return res.status(400).json({ error: 'Invalid Cardiff uni email' });
    }

    const filePath = path.resolve(__dirname, '../data/applications.json');
    let data = [];
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.log('no file')
    }

    data.push({ email, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true, message: 'Email submitted!' });
    console.log('email sent')

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
