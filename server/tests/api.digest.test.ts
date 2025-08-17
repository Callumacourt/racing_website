import request from 'supertest';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import app from '../src/api';
import { Resend } from 'resend';
import fs from 'fs';
vi.mock('fs');
vi.mock('resend');

describe('POST/api/digest', async () => {
    it ('rejects invalid secret key', async () => {
        const response = await request(app)
        .post('/api/digest?secret=ffjeijfiejfsoDjo')
        expect(response.status).toBe(403);
    })

    it ('sends email when called with correct secret key', async () => {
        const response = await request(app)
            .post('/api/digest?secret=' + process.env.DIGEST_SECRET)
            .send();
        expect(response.status).toBe(200);
    })

    it ('correctly sends digest and deletes processed emails', async () => {
        const mockSend = vi.fn().mockResolvedValue({});
        (Resend as any).prototype.emails = { send: mockSend };
        
        // Create test data with emails from yesterday and today
        const yesterday = new Date(Date.now() - 25*60*60*1000).toISOString();
        const today = new Date().toISOString();
        
        const testData = [
            { email: 'old@cardiff.ac.uk', timestamp: yesterday },
            { email: 'new@cardiff.ac.uk', timestamp: today }
        ];
        
        (fs.readFileSync as unknown as Mock).mockReturnValue(JSON.stringify(testData));
        
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
        
        // Check that writeFileSync was called to update the file
        expect(fs.writeFileSync).toHaveBeenCalled();
        
        const writtenData = JSON.parse((fs.writeFileSync as Mock).mock.calls[0][1]);
        expect(writtenData).toEqual([]); 
    });
});