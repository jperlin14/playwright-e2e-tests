import { test, expect } from '@playwright/test';

test.describe(
    'Login functionality',
    { annotation: { type: 'User Story', description: 'This is the test description.' }, tag: '@regression' },
    () => {
        test.beforeEach('Go to login page', async ({ page }) => {
            await page.goto('https://katalon-demo-cura.herokuapp.com/');
            await expect(page).toHaveTitle('CURA Healthcare Service');
            await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');

            // Click on 'Make Appointment' link
            await page.getByRole('link', { name: 'Make Appointment' }).click();
            // assert that 'Please login to make' will be visible
            await expect(page.getByText('Please login to make')).toBeVisible();
        });

        test('Should login successfully', { tag: '@smoke' }, async ({ page }) => {
            // Launch URL and assert title and header

            // Successful Login
            await page.getByLabel('Username').fill('John Doe');
            await page.getByLabel('Password').fill('ThisIsNotAPassword');
            await page.getByRole('button', { name: 'Login' }).click();

            // Verify 'Make Appointment' text after attempting to log in
            await expect(page.locator('h2')).toContainText('Make Appointment');
        });

        // Negative test (invalid credentials) - assert login failed message is displayed
        test('Should prevent login with incorrect creds', async ({ page }) => {
            // Failed Login
            await page.getByLabel('Username').fill('John Smith');
            await page.getByLabel('Password').fill('ThisIsNotAPassword');
            await page.getByRole('button', { name: 'Login' }).click();

            // Verify unsuccessful login

            await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
        });
    }
);
