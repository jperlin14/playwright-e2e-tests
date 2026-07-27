import { FullConfig } from '@playwright/test';
import { exec } from 'node:child_process';
import dotenv from 'dotenv';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env');

const dotenvResult = dotenv.config({
    path: envPath,
});

console.log(`[DEBUG]: Current working directory: ${process.cwd()}`);
console.log(`[DEBUG]: Loading environment file: ${envPath}`);

if (dotenvResult.error) {
    console.error(
        `[ERROR]: Unable to load .env file: ${dotenvResult.error.message}`
    );
} else {
    console.log('[DEBUG]: Parsed .env values:', dotenvResult.parsed);
}

export default async function globalTeardown(config: FullConfig) {
    console.log('[INFO]: Starting the global teardown process...');

    const runner = process.env.RUNNER?.trim().toUpperCase();

    console.log(`[DEBUG]: RUNNER = "${runner}"`);

    if (runner === 'LOCAL') {
        console.log(
            '>> Local run detected - starting Allure server...'
        );

        exec('allure serve', error => {
            if (error) {
                console.error(
                    'ERROR: Starting Allure server:',
                    error.message
                );
            }
        });
    } else {
        console.log(
            `[INFO]: Allure was not started because RUNNER is "${runner}".`
        );
    }

    console.log('[INFO]: Completed the global teardown process...');
}