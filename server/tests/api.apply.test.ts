import request from 'supertest';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import app from '../src/api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('POST /api/apply', () => {
  // Clean up the test database before each test
  beforeEach(async () => {
    await prisma.dailyApplication.deleteMany();
    await prisma.application.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it.each([
    [{ email: 1239 }],
    [{ email: null }],
    [{ email: {} }],
  ])('rejects invalid input: %o', async (body) => {
    const response = await request(app)
      .post('/api/apply')
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid input format');
  });

  it.each([
    [{ email: 'acourtc' }],
    [{ email: '123' }],
    [{ email: 'acourtc@gmail.com' }],
    [{ email: ' @cardiff.ac.uk' }],
  ])('rejects invalidly formatted emails', async (body) => {
    const response = await request(app)
      .post('/api/apply')
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  it('rejects duplicate emails', async () => {
    await prisma.application.create({ data: { email: 'acourtc@cardiff.ac.uk' } });

    const response = await request(app)
      .post('/api/apply')
      .send({ email: 'acourtc@cardiff.ac.uk' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Already applied');
  });

  it('correctly stores email in both daily and memory tables', async () => {
    const testEmail = 'acourtcddd@cardiff.ac.uk';

    const response = await request(app)
      .post('/api/apply')
      .send({ email: testEmail });

    expect(response.status).toBe(200);

    // Check daily applications table
    const dailyApplications = await prisma.dailyApplication.findMany({ where: { email: testEmail } });
    expect(dailyApplications.length).toBe(1);
    expect(dailyApplications[0].email).toBe(testEmail);

    // Check application table
    const application = await prisma.application.findUnique({ where: { email: testEmail } });
    expect(application).not.toBeNull();
    expect(application?.email).toBe(testEmail);
  });
});