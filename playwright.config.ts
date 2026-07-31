import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log(`Hello from config 👋`);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    // globalTimeout: 10_000,
    /* Run tests in files in parallel */
    fullyParallel: false, // default setting
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    // Below is one time task to be executed before a test run.
    globalSetup: require.resolve('./tests/helpers/global-setup.ts'),
    globalTeardown: require.resolve('./tests/helpers/global-teardown.ts'),
    // Set expect timeout at global level. This can slow down test execution so try to avoid setting this.
    // If needed - set this within the test step expect level within the test itself.
    // expect: {timeout: 10_000},

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            'html',
            {
                open: 'never',
            },
        ],
        [
            'allure-playwright',
            {
                detail: true,
                suiteTitle: true,
                environmentInfo: {
                    name: 'TEST',
                    Release: 'Release 1.1',
                    node_version: process.version,
                },
            },
        ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        ignoreHTTPSErrors: true,
        navigationTimeout: 30_000, // Numeric separators improve readability: 30_000 equals 30,000 milliseconds.
        screenshot: 'on',
        // video: 'retain-on-failure',
        // Note: Changes the action timeout setting. In most cases you don't want to change this because it can slow down test execution.
        // actionTimeout: 10_000,
    },

    /* Configure projects for major browsers and mobile devices */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // viewport: null,
                // launchOptions: {
                //     args: ['--start-maximized'],
                // },
            },
        },

        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'], ignoreHTTPSErrors: true },
        // },

        // {
        //     name: 'Microsoft Edge',
        //     use: {
        //         ...devices['Desktop Edge'],
        //         channel: 'msedge',
        //     },
        // },

        // {
        //     name: 'Google Chrome',
        //     use: {
        //         ...devices['Desktop Chrome'],
        //         channel: 'chrome',
        //     },
        // },
        // {
        //     name: 'Galaxy A55',
        //     use: { ...devices['Galaxy A55'] },
        // },

        // {
        //     name: 'Mobile Chrome',
        //     use: {
        //         ...devices['Pixel 5'],
        //     },
        // },

        // {
        //     name: 'Mobile Safari',
        //     use: {
        //         ...devices['iPhone 12'],
        //     },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
