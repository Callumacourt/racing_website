import path from "path";
const filePath = path.resolve(__dirname, '../data/memory.json');
import fs from 'fs';

type Memory = string[];

async function loadMemory (): Promise<Memory> {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Memory;
    } catch {
        return [];
    }
}

export async function addToMemory (email: string) {
    let memory = await loadMemory();
    memory.push(email);
    fs.writeFileSync(filePath, JSON.stringify(memory));
}

export async function resetMemory () {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

export async function isInMemory (email: string) {
    let memory = await loadMemory();
    return memory.includes(email);
}