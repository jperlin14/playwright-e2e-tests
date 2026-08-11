import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger.js';
import HomePage from '../page-objects/nopcommerce.home.page.js';

test('Log into the nopcommerce web application', async ({ page }, testInfo) => {
    // Env config
    const envConfig = testInfo.project.use as any;

    // Create a page object for the HomePage
    const homePage = new HomePage(page);

    // Login nopCommerceWeb
    await homePage.loginToNopCommerceApp(
        envConfig.nopCommerceWeb,
        process.env.NOP_COMMERCE_TEST_USER_NAME,
        process.env.NOP_COMMERCE_TEST_PASSWORD
    );
});
