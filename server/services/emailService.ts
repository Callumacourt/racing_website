import { Resend } from 'resend';

const resend = new Resend(process.env.resendKey);

export async function sendContactEmail(data: { fullname: string; email: string; message: string }) {
  const emailData = {
    from: 'onboarding@resend.dev',
    to: process.env.email_to ?? '',
    subject: `Contact enquiry from ${data.fullname}`,
    html: `<p><strong>Name:</strong> ${data.fullname}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           <p><strong>Message:</strong> ${data.message}</p>`
  };
  
  return await resend.emails.send(emailData);
}

export async function sendSponsorEmail(data: { companyName: string; contactName: string; contactEmail: string; contactNumber?: string }) {
  const emailData = {
    from: 'onboarding@resend.dev',
    to: process.env.email_to ?? '',
    subject: `Sponsorship enquiry from ${data.companyName}`,
    html: `<p><strong>Company:</strong> ${data.companyName}<br>
           <strong>Contact Name:</strong> ${data.contactName}<br>
           <strong>Email:</strong> ${data.contactEmail}<br>
           <strong>Phone:</strong> ${data.contactNumber || 'Not provided'}</p>`
  };
  
  return await resend.emails.send(emailData);
}