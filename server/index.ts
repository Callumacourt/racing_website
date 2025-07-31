import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

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
  
  try {
    const emailData = {
      from: 'onboarding@resend.dev', 
      to: process.env.email_to ?? '',
      subject: `Sponsorship enquiry from ${companyName}`,
      html: `<p><strong>Company:</strong> ${companyName}<br>
             <strong>Contact Name:</strong> ${contactName}<br>
             <strong>Email:</strong> ${contactEmail}<br>
             <strong>Phone:</strong> ${contactNumber}</p>`
    };
    
    const result = await resend.emails.send(emailData);

    res.status(200).json({ success: true, emailId: result.data?.id });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Email failed to send' });
  }
});

app.post('/api/contact', async (req, res) => {
    const {fullname, email, message} = req.body;

    try {
        const contactData = {
            from: 'onboarding@resend.dev',
            to: process.env.email_to ?? '',
            subject: `Contact enquiry from ${fullname}`,
            html: `<p>${fullname}</p>
                    <p>${email}</p>
                    <p>${message}</p>`
        };
        
        const result = await resend.emails.send(contactData);
        res.status(200).json({ success: true, emailId: result.data?.id });
        } catch (err) {
            res.status(500).json({ success: false, error: 'Email failed to send' });
        }
    }
    )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
