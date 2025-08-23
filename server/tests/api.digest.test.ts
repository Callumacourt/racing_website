import request from 'supertest';
import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest';
import app from '../src/api';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

vi.mock('resend');

const prisma = new PrismaClient();

describe('POST /api/digest', () => {
  beforeEach(async () => {
    // Clean up daily applications before each test
    await prisma.dailyApplication.deleteMany();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('rejects invalid secret key', async () => {
    const response = await request(app)
      .post('/api/digest?secret=invalidsecret');
    expect(response.status).toBe(403);
  });

  it('sends email when called with correct secret key', async () => {
    // Insert a test daily application
    await prisma.dailyApplication.create({
      data: { email: 'test@cardiff.ac.uk', date: new Date() }
    });

    // Mock Resend email sending
    const mockSend = vi.fn().mockResolvedValue({});
    (Resend as any).prototype.emails = { send: mockSend };

    const response = await request(app)
      .post(`/api/digest?secret=${process.env.DIGEST_SECRET}`)
      .send();

    expect(response.status).toBe(200);
    expect(mockSend).toHaveBeenCalled();
  });

  it('correctly sends digest and deletes processed emails', async () => {
    // Insert test data for yesterday and today
    const yesterday = new Date(Date.now() - 25 * 60 * 60 * 1000);
    const today = new Date();

    await prisma.dailyApplication.createMany({
      data: [
        { email: 'old@cardiff.ac.uk', date: yesterday },
        { email: 'new@cardiff.ac.uk', date: today }
      ]
    });

    // Mock Resend email sending
    const mockSend = vi.fn().mockResolvedValue({});
    (Resend as any).prototype.emails = { send: mockSend };

    // Call the digest endpoint
    const response = await request(app)
      .post(`/api/digest?secret=${process.env.DIGEST_SECRET}`)
      .send();

    expect(response.status).toBe(200);

    // Check email was sent with correct content
    expect(mockSend).toHaveBeenCalledWith({
      from: 'onboarding@resend.dev',
      to: process.env.email_to ?? '',
      subject: 'Applications Digest (2)',
      html: '<h1>Applications</h1><ul><li>old@cardiff.ac.uk</li><li>new@cardiff.ac.uk</li></ul>'
    });

    // Check that daily applications are deleted after digest
    const remaining = await prisma.dailyApplication.findMany();
    expect(remaining.length).toBe(0);
  });
});