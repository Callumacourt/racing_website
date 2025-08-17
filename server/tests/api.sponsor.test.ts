import request from 'supertest';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import app from '../src/api';
import { Resend } from 'resend';
vi.mock('fs');
vi.mock('resend');

describe('POST/api/sponsor', () => {
    const mockSend = vi.fn();

    beforeEach(() => {
        mockSend.mockReset();

        (Resend as any).prototype.emails = { send: mockSend }
    });

    it ('sends sponsor email successfully', async () => {
        mockSend.mockResolvedValue({});

        const response = await request(app)
        .post('/api/sponsor')
        .send({
            companyName: 'Test Co',
            contactName: 'blah',
            contactEmail: 'blahblah@example.com',
            contactNumber: '1234567890',
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(mockSend).toHaveBeenCalled();
    })

        it ('sends sponsor email successfully without number', async () => {
        mockSend.mockResolvedValue({});

        const response = await request(app)
        .post('/api/sponsor')
        .send({
            companyName: 'Test Co',
            contactName: 'blah',
            contactEmail: 'blahblah@example.com',
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(mockSend).toHaveBeenCalled();
    })

    it ('returns 400 if required fields missing', async () => {
        const response = await request(app).post('/api/sponsor').send({companyName: 'test'}) 
        expect(response.status).toBe(400)
    })

    it('sponsor form rejects invalid mobile format if given mobile', async () => {
        mockSend.mockResolvedValue({});

        const response = await(request(app))
        .post('/api/sponsor')
        .send({
            companyName: 'Test Co',
            contactName: 'blah',
            contactEmail: 'blahblah@example.com',
            contactNumber: '123',
        });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    })

    it('returns 400 if no data is sent', async () => {
        const res = await request(app).post('/api/sponsor').send({});
        expect(res.status).toBe(400);
        });

    })