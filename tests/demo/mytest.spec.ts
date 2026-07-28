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
import { test, expect, devices } from "@playwright/test";
// This indicates which modules you want to load for this particular test so it will understand these commands.
// Note: you can add more to this list by adding a comma after 'expect' and
// then CTRL-Spacebar to show available items to import.

test("Should load homepage with correct title", async ({ page }) => {
  // 1. Go to homepage
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");
  // Note: Title found using inspect (and then CTRL-F for Find (title)) on the webpage/copied

  // 3. Assert header text matches expected value
  // 'await' - wait for the fixture (page) to load before moving forward
  // 'expect' - assertion, we want to verify some value or output
  // 'page' - calls the 'page' fixture.
  // 'locator' - method being called to perform on the page. In this case we are using locator method
  // to find the object.
  // '//h1' - tag we are using to find the element in the DOM.
  // 'toHaveText' - method being called saying we expect it to contain the expected text that follows.
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
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
// Note: -- headed is optional

// Another test example
test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  // Structure - call 'test' function
  // Then the test name "Should do something"
  // Then (optional) tag or annotation
  // Then we designate as an asynchronous test
  // Then we identify the fixture to be used (page value is pulled in from the fixtures)
  // Fixtures other than 'page', etc. can be used. (here testInfo is added) using comma separated values
  // Hint: place curson in this field and hit CTRL-Space to see the additional available selections.
  // Then Arrow Function => to indicate 'run everything within the curly brackets'.
  // Steps
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.locator("//h1").click();
  // This clicks the heading of the screen - won't really do anything.
  // But wanted this example to show how to use locator and perform an action
  // on the target element.
});


// Lesson 102
// Code from the Deep Dive into Playwright Locators section of the course.
// IMPORTANT
// 'test.only' will make it so only this 'test' is executed within this file.
// test.only("Should demo locators", async ({ page }, testInfo) => {
test("Should demo locators", async ({ page }, testInfo) => {
  // ✅'page.getBy*()' and 'page.locator()' methods return the 'locator' object.
  // ✅The above methods not to be 'awaited'.
  // ✅The type of locator is an 'object'.
  // ✅Locators are LAZY until an action is fired on them.
  // This means that they don't use the { name: "Make Appointment" } part of the code unless
  // an action is being performed against the element that was located.

  // Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Click on 'Make Appointment' link
  // let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" }) -- previous version of this line of code.

  let makeAppmtBtn = page.getByRole("link", { name: "Invalid Locator" }) // Set the locator to a variable. Changed 'name' to invalid value.
  // If you hover over 'getbyRole' you'll see that a Promise is not returned - so no need for an 'await' keyword.
  // Also, locators are considered 'LAZY' because if you don't perform an action it will not actually look for the element.
  // Since we are just assigning the locator info to a variable it is not actually trying to locate the element - this code will pass.
  console.log(`>> The type of locator: ${typeof makeAppmtBtn}, The value of the locator is ${JSON.stringify(makeAppmtBtn)}`);
  // The above line of code will run successfully because no action is being performed against the element.
  // BUT if we now try to perform an action against that element it will throw an error because the locator info is invalid
  // and we are trying to perform an action against that element - it tries to find it in the DOM and won't be able to.
  // See below:
  // await makeAppmtBtn.click(); // An action is being performed, so this requires the 'await' keyword to be used.
  // The above line of code will still FAIL because it is performing an action against the element (click)
  // assert that 'Please login to make' will be visible
  // await expect(page.getByText("Please login to make")).toBeVisible();
});

test("Should demo config", async ({ page }, testInfo) => {
 console.log(`>> Config at run-time: ${JSON.stringify(testInfo.config)}`);
});

// browserName FIXTURE can be used to do things like only execute a test for certain browsers
test("Should demo browserName fixture", async ({ page, browserName }, testInfo) => {
console.log(`>> The test runs on ${browserName}`);
});

// request FIXTURE can be used for API testing
// test.only("Should demo request fixture", async ({ request }, testInfo) => {
// request. // request options are displayed after the period.
// });

// Returns all devices available in Playwright (browsers, mobile devices, etc.)
test.only('Should demo devices', async () => {
    const availableDevices = Object.keys(devices);

    console.log(`Playwright version device count: ${availableDevices.length}`);
    console.log(availableDevices);
});