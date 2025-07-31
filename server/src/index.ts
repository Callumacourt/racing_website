import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { validateEmail, validateRequiredFields, validateMobile, sanitiseInput } from '../utils/validators';

configDotenv();

console.log('Environment check:');
console.log('Resend Key:', process.env.resendKey ? 'Loaded' : 'Missing');
console.log('Email To:', process.env.email_to);

const app = express();
const resend = new Resend(process.env.resendKey);

app.use(cors());
app.use(express.json());

app.post('/api/sponsor', async (req, res) => {
  const { companyName, contactName, contactEmail, contactNumber } = req.body;

  // Sanitise all inputs
  const sanitisedCompanyName = sanitiseInput(companyName);
  const sanitisedContactName = sanitiseInput(contactName);
  const sanitisedContactEmail = sanitiseInput(contactEmail);
  const sanitisedContactNumber = sanitiseInput(contactNumber)

  // Check all required fields entered - use sanitised inputs
  const sanitisedData = {
    companyName: sanitisedCompanyName,
    contactName: sanitisedContactName,
    contactEmail: sanitisedContactEmail
  };
  const validationError = validateRequiredFields(sanitisedData, ['companyName', 'contactName', 'contactEmail']);
  if (validationError) {
    return res.status(400).json({success: false, error: `Missing required field ${validationError}`})
  }

  // Validate email
  if (!validateEmail(sanitisedContactEmail)) {
    return res.status(400).json({success: false, error: 'Invalid email'})
  }

  // Validate mobile if provided
  if (sanitisedContactNumber) {
    const number = sanitisedContactNumber.trim();
    if (!validateMobile(number)) {
      return res.status(400).json({success: false, error: 'Invalid mobile'})
    }
  }
  
  try {
    const emailData = {
      from: 'onboarding@resend.dev', 
      to: process.env.email_to ?? '',
      subject: `Sponsorship enquiry from ${sanitisedCompanyName}`,
      html: `<p><strong>Company:</strong> ${sanitisedCompanyName}<br>
             <strong>Contact Name:</strong> ${sanitisedContactName}<br>
             <strong>Email:</strong> ${sanitisedContactEmail}<br>
             <strong>Phone:</strong> ${sanitisedContactNumber || 'Not provided'}</p>`
    };
    
    const result = await resend.emails.send(emailData);

    res.status(200).json({ success: true, emailId: result.data?.id });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Email failed to send' });
  }
});

app.post('/api/contact', async (req, res) => {
    const {fullname, email, message} = req.body;

    // Sanitise all inputs
    const sanitisedFullname = sanitiseInput(fullname);
    const sanitisedEmail = sanitiseInput(email);
    const sanitisedMessage = sanitiseInput(message);

    // Use sanitised inputs for validation
    const sanitisedData = {
      fullname: sanitisedFullname,
      email: sanitisedEmail,
      message: sanitisedMessage
    };
    const validationError = validateRequiredFields(sanitisedData, ['fullname', 'email', 'message']);
    if (validationError) {
      return res.status(400).json({success: false, error: `Missing required field ${validationError}`})
    }

    if (!validateEmail(sanitisedEmail)) {
      return res.status(400).json({success: false, error: 'Invalid email'})
    }

    try {
        const contactData = {
            from: 'onboarding@resend.dev',
            to: process.env.email_to ?? '',
            subject: `Contact enquiry from ${sanitisedFullname}`,
            html: `<p><strong>Name:</strong> ${sanitisedFullname}</p>
                   <p><strong>Email:</strong> ${sanitisedEmail}</p>
                   <p><strong>Message:</strong> ${sanitisedMessage}</p>`
        };
        
        const result = await resend.emails.send(contactData);
        res.status(200).json({ success: true, emailId: result.data?.id });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Email failed to send' });
    }
});

export default app;
