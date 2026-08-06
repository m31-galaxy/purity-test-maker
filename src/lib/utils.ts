import { access, readdir, readFile, stat, writeFile } from 'fs/promises';
import type { PurityTestData } from './types';

export async function getPurityTest(testId: string): Promise<PurityTestData> {
    const filePath = `purity-tests/${testId}.json`;
    return JSON.parse(await readFile(filePath, 'utf-8'));
}

export async function getAllPurityTests(): Promise<Record<string, PurityTestData>> {
    const files = await readdir('purity-tests');
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const entries = await Promise.all(
        jsonFiles.map(async file => {
            const testId = file.replace(/\.json$/, '');
            const data = JSON.parse(await readFile(`purity-tests/${file}`, 'utf-8'));
            return [testId, data];
        })
    );
    return Object.fromEntries(entries);
}

export async function getPurityTestEntries(): Promise<{ testId: string; lastModified: Date }[]> {
    const files = await readdir('purity-tests');
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    return Promise.all(
        jsonFiles.map(async file => {
            const { mtime } = await stat(`purity-tests/${file}`);
            return { testId: file.replace(/\.json$/, ''), lastModified: mtime };
        })
    );
}

export async function countPurityTests(): Promise<number> {
    const files = await readdir('purity-tests');
    return files.filter(file => file.endsWith('.json')).length;
}

export async function savePurityTest(testData: PurityTestData): Promise<string> {
    const baseFileName = testData.name
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    let suffix = 1;
    let testId = baseFileName;
    while (true) {
        try {
            await access(`purity-tests/${testId}.json`);
            suffix += 1;
            testId = `${baseFileName}-${suffix}`;
        } catch {
            break;
        }
    }

    await writeFile(`purity-tests/${testId}.json`, JSON.stringify(testData, null, 2));
    return testId;
}
