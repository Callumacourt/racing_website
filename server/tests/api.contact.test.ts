import request from 'supertest';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import app from '../src/api';
import { Resend } from 'resend';
vi.mock('fs');
vi.mock('resend');

describe('POST/api/contact', () => {

    const mockSend = vi.fn();

    beforeEach(() => {
        mockSend.mockReset();

        (Resend as any).prototype.emails = { send: mockSend }
    });
    
    it ('sends contact email successfully', async () => {
    mockSend.mockResolvedValue({});

    const response = await request(app)
    .post('/api/contact')
    .send({
        fullname: 'john boy',
        email: 'johnboy@gmail.com',
        message: 'your website is coooool'
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true)
    expect(mockSend).toHaveBeenCalled();
    })


    it('rejects invalid email formats', async () => {
        mockSend.mockResolvedValue({});

        const response = await request(app)
        .post('/api/contact')
        .send({
            fullname: 'John Boy',
            email: 'john1',
            message: 'cool website'
        });
        
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    })

    it('returns 400 if no data is sent', async () => {
        const res = await request(app).post('/api/contact').send({});
        expect(res.status).toBe(400);
    });
})