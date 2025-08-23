import path from "path";
const filePath = path.resolve(__dirname, '../data/applications.json');
import { prisma } from './index';

export async function loadDailyApplications() {
    // Get all daily applications from the database
    return await prisma.dailyApplication.findMany();
}

export async function addDailyApplication(email: string, timestamp: string) {
    // Store in the database (timestamp as Date)
    await prisma.dailyApplication.create({
        data: { email, date: new Date(timestamp) }
    });
}

export async function resetDailyApplications() {
    // Delete all daily applications from the database
    await prisma.dailyApplication.deleteMany();
}
