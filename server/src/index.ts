import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import { sanitiseContactData, validateContactData, sanitiseSponsorData, validateSponsorData, validateInput } from '../utils/validation';
import { sendContactEmail, sendSponsorEmail } from '../services/emailService';
import helmet from 'helmet';


console.log('Environment check:');
console.log('Resend Key:', process.env.resendKey ? 'Loaded' : 'Missing');
console.log('Email To:', process.env.email_to);

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

export default app;
