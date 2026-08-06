/**
 * NOTE: Only part of this test will execute!
 * For one of the tests in this script we added 'test.only' so it only executes the code within the curly brackets
 * for that particular test. To run the other tests you will need to update 'test.only' to just 'test' in
 * that code block.
 *
 * Our first test
 */

/**
 * Note that every .spec or .test file starts with an import.
 *
 * */
// Imports from Test Runner. Note that you can import multiple using comma separated values
// Here we are importing 'test' and 'expect' from Test Runner
import { test, expect, devices } from '@playwright/test';
// This indicates which modules you want to load for this particular test so it will understand these commands.
// Note: you can add more to this list by adding a comma after 'expect' and
// then CTRL-Spacebar to show available items to import.

// Allows us to access data stored in the constants.json file
import constants from '../../data/constants.json';

// Allows us to access the log function in the logger.ts file
import { log } from '../helpers/logger.js';

test('Should load homepage with correct title', async ({ page }) => {
    // 1. Go to homepage
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // 2. Assert if the title is correct
    await expect(page).toHaveTitle('CURA Healthcare Service');
    // Note: Title found using inspect (and then CTRL-F for Find (title)) on the webpage/copied

    // 3. Assert header text matches expected value
    // 'await' - wait for the fixture (page) to load before moving forward
    // 'expect' - assertion, we want to verify some value or output
    // 'page' - calls the 'page' fixture.
    // 'locator' - method being called to perform on the page. In this case we are using locator method
    // to find the object.
    // '//h1' - tag we are using to find the element in the DOM.
    // 'toHaveText' - method being called saying we expect it to contain the expected text that follows.
    await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');
    // Expected result copied from DOM (CURA Healthcare Service)
    // Located by inspecting webpage, using the arrow to click on the page header and finding the xpath
    // After you click the page header look at the DOM - it has a tag of H1
    // In the Find field enter //h1 and the header line in the DOM will be highlighted indicating that
    // this is the correct locator.
    // Note: In later courses there may be more than 1 element with the same tag - so you click the find next
    // button to see if more than 1 exists - if so you will need to expand on the xpath to find this
    // particular element.
    // locator method used in this statement
});

// To execute the test go to Terminal in VS Code and execute the following:
// npx playwright test tests/demo/mytest.spec.ts --headed
// Note: --headed is optional

// Another test example
test('Should do something', { tag: '@smoke' }, async ({ page }, testInfo) => {
    // Structure - call 'test' function
    // Then the test name "Should do something"
    // Then (optional) tag or annotation
    // Then we designate as an asynchronous test
    // Then we identify the fixture to be used (page value is pulled in from the fixtures)
    // Fixtures other than 'page', etc. can be used. (here testInfo is added) using comma separated values
    // Hint: place cursor in this field and hit CTRL-Space to see the additional available selections.
    // Then Arrow Function => to indicate 'run everything within the curly brackets'.
    // Steps
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.locator('//h1').click();
    // This clicks the heading of the screen - won't really do anything.
    // But wanted this example to show how to use locator and perform an action
    // on the target element.
});

// Lesson 102
// Code from the Deep Dive into Playwright Locators section of the course.
// IMPORTANT
// 'test.only' will make it so only this 'test' is executed within this file.
// test.only("Should demo locators", async ({ page }, testInfo) => {
test('Should demo locators', async ({ page }, testInfo) => {
    // ✅ 'page.getBy*()' and 'page.locator()' methods return the 'Locator' object.
    // ✅ The above methods are not to be 'awaited'.
    // ✅ The type of locator is an object.
    // ✅ Locators are LAZY until an action is fired on them.

    // Launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // Click on 'Make Appointment' link
    const makeAppmtBtn = page.getByRole('link', { name: 'Invalid Locator' });

    console.log(`>> The type of locator: ${typeof makeAppmtBtn}, The value of the locator is ${JSON.stringify(makeAppmtBtn)}`);

    // Uncomment the line below to demonstrate locator failure.
    // await makeAppmtBtn.click();
});

test('Should demo config', async ({ page }, testInfo) => {
    console.log(`>> Config at run-time: ${JSON.stringify(testInfo.config)}`);
});

// browserName FIXTURE can be used to do things like only execute a test for certain browsers
test('Should demo browserName fixture', async ({ page, browserName }, testInfo) => {
    console.log(`>> The test runs on ${browserName}`);
});

// request FIXTURE can be used for API testing
// test.only("Should demo request fixture", async ({ request }, testInfo) => {
// request. // request options are displayed after the period.
// });

// Returns all devices available in Playwright (browsers, mobile devices, etc.)
test('Should demo devices', async () => {
    const availableDevices = Object.keys(devices);

    console.log(`Playwright version device count: ${availableDevices.length}`);
    console.log(availableDevices);
});

// Below example(s) can be executed after updating playwright.config.ts to run fullyParallel: true,
// changing the number of projects enabled, etc., to demonstrate the number of tests and workers
// that are executed.
test('Should demo parallel run 1', { tag: '@demo' }, async ({ page }, testInfo) => {
    await page.goto('https://www.google.com');
});

test('Should demo parallel run 2', { tag: '@demo' }, async ({ page }, testInfo) => {
    await page.goto('https://www.google.com');
});

test('Should demo constants data', async ({ page }, testInfo) => {
    // Access the status code value from the constants.json file stored in the data folder.
    // To access we needed to add an import statement at the top of the file.
    console.log(`>> Constants data: ${JSON.stringify(constants.STATUSCODES)}`);
});

test.only('Should demo a click action', async ({ page }, testInfo) => {
    // Demonstrates Playwright's native click() action.

    // Navigate to the application using Playwright's native page.goto() method.
    // await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // Create a locator using an intentionally incorrect accessible name.
    const ele = page.getByRole('link', { name: 'Make-Appointment' });

    // The accessible name is intentionally incorrect.
    // The correct name is "Make Appointment" (without the hyphen).
    // This will cause Playwright to throw an error when it attempts to
    // locate and click the element.
    // await ele.click();

    // Reproduce the enhanced click logic defined in BasePage
    // so we can compare it with Playwright's native click() behavior.
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    try {
        await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
        await ele.click();
    } catch (error) {
        await log('error', `Failed to click element: ${ele.toString()}, original error: ${error}`);
        throw error;
    }
});
