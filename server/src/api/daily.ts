import path from "path";
const filePath = path.resolve(__dirname, '../data/applications.json');
import fs from 'fs';

type DailyApplications = {
    email: string,
    timestamp: string
}

export async function loadDailyApplications () {
    let applications: DailyApplications [] = [];
    return applications = JSON.parse(fs.readFileSync(filePath, 'utf8')) as DailyApplications[];
}

export async function addDailyApplication (email: string, timestamp: string) {
    let applications = await loadDailyApplications();
    applications.push({email: email, timestamp: timestamp})
    fs.writeFileSync(filePath, JSON.stringify(applications))
}

export async function resetDailyApplications () {
    let applications = await loadDailyApplications();
    applications = [];
     fs.writeFileSync(filePath, JSON.stringify(applications))
}
