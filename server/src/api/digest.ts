// Uncertainty in UNI hosting permissions so running digest daily

import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { resetDailyApplications } from './daily';

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

  if (data.length === 0) return;

  const listHtml = data.map(e => `<li>${e.email}</li>`).join('');

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.email_to ?? '',
    subject: `Applications Digest (${data.length})`,
    html: `<h1>Applications</h1><ul>${listHtml}</ul>`
  });

  // Clear all applications after sending digest
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

