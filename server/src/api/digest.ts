import { Resend } from 'resend';
import { resetDailyApplications, loadDailyApplications } from './daily';

const resend = new Resend(process.env.resendKey);

// Run daily with CRON job

export async function sendDailyDigest() {
    // Load all daily applications from the database
    const data = await loadDailyApplications();

    if (data.length === 0) return;

    const listHtml = data.map(e => `<li>${e.email}</li>`).join('');

    // Send digest with all applications for the day 
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.email_to ?? '',
        subject: `Applications Digest (${data.length})`,
        html: `<h1>Applications</h1><ul>${listHtml}</ul>`
    });

    // Clear all applications after sending digest
    await resetDailyApplications();
}

