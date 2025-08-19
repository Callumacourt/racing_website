import request from 'supertest';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import app from '../src/api';
import { Resend } from 'resend';
import fs from 'fs';
vi.mock('fs');
vi.mock('resend');