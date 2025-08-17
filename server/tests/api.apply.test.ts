import request from 'supertest';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import app from '../src/api';
import fs from 'fs';
vi.mock('fs');
vi.mock('resend');

describe('POST/api/apply', () => {

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
    [{email: 'acourtc' }],
    [{email: '123'}],
    [{email: 'acourtc@gmail.com'}],
    [{email: ' @cardiff.ac.uk'}],
    ])('rejects invalidly formatted emails', async (body) => {
    const response = await request(app)
        .post('/api/apply')
        .send(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
    });


    it('rejects duplicate emails', async () => {
        // Mock memory file to already have the email
        (fs.readFileSync as unknown as Mock).mockImplementation((path) => {
            if (path.includes('memory.json')) {
                return JSON.stringify([ 'acourtc@cardiff.ac.uk' ]);
            }
            return '[]';
        });

        const response = await request(app)
            .post('/api/apply')
            .send({ email: 'acourtc@cardiff.ac.uk' });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Already applied');
    });

    it('correctly stores email in both daily and memory files', async () => {
        // Track what's written to each file
        let applicationsData: any[] = [];
        let memoryData: any[] = [];
        
        // Mock readFileSync to return empty arrays
        (fs.readFileSync as unknown as Mock).mockImplementation((path) => {
            if (path.includes('memory.json')) {
                return JSON.stringify([]);
            }
            return '[]';
        });
        
        // Mock writeFileSync to capture written data
        (fs.writeFileSync as unknown as Mock).mockImplementation((path, content) => {
            if (path.includes('memory.json')) {
                memoryData = JSON.parse(content);
            } else if (path.includes('applications.json')) {
                applicationsData = JSON.parse(content);
            }
        });
        
        const response = await request(app)
            .post('/api/apply')
            .send({ email: 'acourtc@cardiff.ac.uk' });
        
        expect(response.status).toBe(200);
        
        // Check daily applications file (with timestamp)
        expect(applicationsData).toEqual([
            { email: 'acourtc@cardiff.ac.uk', timestamp: expect.any(String) }
        ]);
        
        // Check memory file (email only)
        expect(memoryData).toEqual([
            'acourtc@cardiff.ac.uk' 
        ]);
    });
});