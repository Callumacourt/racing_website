import { PrismaClient } from '@prisma/client'
import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import { sanitiseContactData, validateContactData, sanitiseSponsorData, validateSponsorData, validateInput } from '../../utils/validation';
import { validateEmail } from '../../utils/validators';
import { sendContactEmail, sendSponsorEmail } from '../../services/emailService';
import helmet from 'helmet';
import { sendDailyDigest } from './digest'; 
import { addDailyApplication, resetDailyApplications } from './daily';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet()); // Security headers

app.use(cors());
app.use(express.json({limit: '15kb'})); // Limit JSON body size
export const prisma = new PrismaClient();

// Rate limiter for form endpoints 
const formLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 2, // Only 2 requests per minute per IP
  message: { success: false, error: 'Too many requests, please try again later.' },
});

app.use('/api/contact', formLimiter);
app.use('/api/sponsor', formLimiter);

/**
 * Contact form endpoint.
 * - Validates and sanitises input.
 * - Sends contact email via email service.
 */
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

/**
 * Sponsorship enquiry endpoint.
 * - Validates and sanitises input.
 * - Sends sponsor email via email service.
 */
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

/**
 * Team application endpoint.
 * - Validates input and email format.
 * - Checks for duplicate applications.
 * - Stores valid applications for daily digest.
 */
app.post('/api/apply', async (req, res) => {
  try {
    // Validate types
    const typeValidation = validateInput(req.body);
    if (!typeValidation.isValid) {
      return res.status(400).json({ success: false, error: typeValidation.error });
    }

    // Validate email format (must be Cardiff University email)
    const email = req.body.email;
    if (!validateEmail(email) || (!/^[A-Za-z0-9._%+-]+@cardiff\.ac\.uk$/i.test(email))) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    // Check for duplicate application
    const alreadyApplied = await prisma.application.findUnique({ where: { email }})
    if (alreadyApplied) {
      return res.status(400).json({ success: false, error: 'Already applied' })
    }

    // Append to daily applications for daily digest and record in DB
    addDailyApplication(email, new Date().toISOString());
    await prisma.application.create({ data: { email } });

    res.status(200).json({ success: true, message: 'Email stored for digest' });
    console.log('Email stored for digest')

  } catch (error) {
    console.log('Apply endpoint error', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

/**
 * Daily digest endpoint.
 * - Protected by secret query parameter.
 * - Triggers sending of the daily digest email.
 */
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
