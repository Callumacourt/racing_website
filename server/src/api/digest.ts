// Uncertainty in UNI hosting permissions so running digest daily

import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.resendKey);
const filePath = path.resolve(__dirname, '../data/applications.json');

type ApplicationEvent = {
  email: string;
  timestamp: string;
};

export async function sendDailyDigest() {
  let data: ApplicationEvent[] = [];
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as ApplicationEvent[];
  } catch (err) {
    return; // nothing to send
  }

  const yesterday = new Date(Date.now() - 24*60*60*1000);
  const todaysEmails = data.filter(
    (e: ApplicationEvent) => new Date(e.timestamp) > yesterday
  );

  if (todaysEmails.length === 0) return;

  const listHtml = todaysEmails.map(e => `<li>${e.email}</li>`).join('');

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.email_to ?? '',
    subject: `Daily Applications Digest (${todaysEmails.length})`,
    html: `<h1>Today's Applications</h1><ul>${listHtml}</ul>`
  });

  // Remove sent emails
  const remaining = data.filter(
    (e: ApplicationEvent) => new Date(e.timestamp) <= yesterday
  );
  fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2));
}
