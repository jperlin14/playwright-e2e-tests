import { test, expect } from '@playwright/test';

test.describe(
    'Login functionality',
    {
        annotation: {
            type: 'User Story',
            description: 'This is the test description.',
        },
        tag: '@regression',
    },
    () => {
        test.beforeEach('Go to login page', async ({ page }) => {
            await page.goto('https://katalon-demo-cura.herokuapp.com/', {timeout: 60_000}); // ✅ Will override the global nav timeout.

            await expect(page).toHaveTitle('CURA Healthcare Service');
            await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');

            // Click the Make Appointment link.
            await page.getByRole('link', { name: 'Make Appointment' }).click();

            // Verify that the login page instructions are visible.
            await expect(page.getByText('Please login to make')).toBeVisible();
        });

        // Only this test will be executed from this file because test.only is used.
        test.only('Should login successfully', { tag: '@smoke' }, async ({ page }) => {
            /**
             * Capability: Auto-waiting
             *
             * Demonstration scenarios:
             *
             * 1. Create a locator without performing an action.
             *    - Playwright locators are lazy.
             *    - Creating the locator does not immediately search the page.
             *
             * 2. Use an invalid locator with an action method.
             *    - Result:
             *      locator.fill: Test timeout of 30000ms exceeded.
             *
             * 3. Use a valid locator with an invalid action method.
             *    - Result:
             *      locator.check: Error: Not a checkbox or radio button.
             *
             * 4. Use an invalid locator with an auto-retrying assertion.
             *    - Result:
             *      expect(locator).toContainText(expected) failed.
             *      Timeout: 5000ms.
             */

            /*
             * Example 1: INVALID LOCATOR USED WITH AN ACTION
             *
             * The label name UserID does not exist on the page.
             * Creating the locator does not immediately search the DOM.
             * The locator is evaluated when fill() attempts to use it.
             *
             * Uncomment the two lines below to demonstrate.
             */

            // const userNameEle = page.getByLabel('UserID');
            // await userNameEle.fill('John Doe');

            /*
             * Example 2: VALID LOCATOR USED WITH AN INVALID ACTION
             *
             * The Username locator is valid and resolves to a text input.
             * However, check() is intended for checkbox and radio-button
             * elements, so it cannot be used with a text input field.
             *
             * Uncomment the two lines below to demonstrate.
             */

            // const userNameEle = page.getByLabel('Username');
            // await userNameEle.check();

            /*
             * Functional login steps.
             *
             * Playwright auto-waits for each element to be ready before
             * performing fill() or click().
             */
            // Timeout slow example. This will triple the timeout setting at the test level:
            // test.slow();
            // Set timeout example. Can be used instead of test.slow to set a specific timeout length.
            // test.setTimeout(120_000);

            await page.getByLabel('Username').fill('John Doe');
            await page.getByLabel('Password').fill('ThisIsNotAPassword');
            // Example - step level timeout setting on click.
            await page.getByRole('button', { name: 'Login' }).click({ timeout: 10_000 });

            /*
             * Example of a valid assertion.
             *
             * The expected heading is an h2 element.
             * Uncomment this assertion when running the functional version
             * of the test.
             */

            // await expect(page.locator('h2')).toContainText(
            //     'Make Appointment'
            // );

            /*
             * Example 3: INVALID LOCATOR USED WITH AN EXPECT ASSERTION
             *
             * No h5 element containing Make Appointment exists on the page.
             * Playwright automatically retries this assertion until the
             * default expect timeout of 5000ms is reached.
             *
             * Result:
             * expect(locator).toContainText(expected) failed.
             * Timeout: 5000ms.
             */

            //await expect(page.locator('h5')).toContainText('Make Appointment');
            // This has an explicit expect timeout length set within it.
            await expect(page.locator('h2')).toContainText('Make Appointment', { timeout: 10_000 });
        });

        test('Should prevent login with incorrect creds', async ({ page }) => {
            // Attempt to log in with invalid credentials.
            await page.getByLabel('Username').fill('John Smith');
            await page.getByLabel('Password').fill('ThisIsNotAPassword');
            await page.getByRole('button', { name: 'Login' }).click();

            // Verify that the unsuccessful-login message is displayed.
            await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
        });
    }
);
