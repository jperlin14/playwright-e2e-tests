/**
 * ELEMENT: Button, Link
 *
 * @actions
 * 1. ✅Click
 * 2. ✅Press
 * 3. ✅Double-click
 * 4. ✅Right-click
 * 5. ✅Hover over link
 * 6. ✅[Optional] - timeout if slow
 */

import { test, expect } from '@playwright/test';

test.describe('Make appointment', () => {
    test.beforeEach('Login with valid creds', async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');

        // 📍Click on 'Make Appointment' link
        // Below are different methods that can be performed on an element.

        // await page.getByRole('link', { name: 'Make Appointment' }).click();
        // await page.getByRole('link', { name: 'Make Appointment' }).press("Enter");
        // await page.getByRole('link', { name: 'Make Appointment' }).dblclick();
        // await page.getByRole('link', { name: 'Make Appointment' }).click({ button: "right" });
        // await page.getByRole('link', { name: 'Make Appointment' }).hover();
        await page.getByRole('link', { name: 'Make Appointment' }).click({ timeout: 10_000 });

        // assert that 'Please login to make' will be visible
        await expect(page.getByText('Please login to make')).toBeVisible();

        /**
         * 📍ELEMENT: TEXT BOX
         *
         * @actions
         * 1. ✅Clear/click before filling
         * 2. ✅Fill
         * 3. ✅pressSequentially (slow typing)
         */

        // 📍Successful login
        // await page.getByLabel('Username').fill('John Doe');

        // Clears and enters

        // await page.getByLabel('Username').clear();
        // await page.getByLabel('Username').fill('John Doe');

        // PressSequentially
        await page.getByLabel('Username').pressSequentially('John Doe', { delay: 300 });

        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
    });

    // Tests go here
    test('Should make an appointment with non-default values', async ({ page }) => {
        /**
         * ELEMENT: 📍DROPDOWN
         * Uses the Facility dropdown in the test web app
         *
         * @actions
         * 1. ✅Assert default option
         * 2. ✅Select by:
         *  - label
         *  - index
         * 3. ✅Assert the count
         * 4. ✅Get all dropdown values
         */
        // ***********************************************
        // 📍***************DROPDOWN**********************
        // ***********************************************

        // Assert default option value
        // use 'expect' and copy the locator into the code.
        // use 'toHaveValue' to verify the current value of the dropdown. It has a promise (hover over to see it)
        // so we need to add an 'await' function
        await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center'); // assert current value

        // Select by Option or Index
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
        await page.getByLabel('Facility').selectOption({ label: 'Seoul CURA Healthcare Center' }); // select 3rd option using different method
        await page.getByLabel('Facility').selectOption({ index: 0 }); // select by index (first option in dropdown)

        // ASSERT the count (number of values available for selection in the dropdown)
        let drpdwnOptionsEle = page.getByLabel('Facility').locator('option'); // Filter by locator
        await expect(drpdwnOptionsEle).toHaveCount(3); // This assertion will pass
        // await expect(drpdwnOptionsEle).toHaveCount(4); // This assertion will fail because there are 3 available selections in the dropdown

        // GET ALL DROPDOWN VALUES
        // This example demonstrates using:
        //   - an array
        //   - a for...of loop
        //   - textContent()
        //   - push()

        // Create an empty array (think of it as a shopping basket)
        let listOfOptions = [];

        // Get all locators that match the 'Facility' label.
        // Since there is only one Facility dropdown on the page,
        // this array contains only one locator (the <select> element).
        let listOfDrpdwnElems = await page.getByLabel('Facility').all();

        // Loop through each locator in the array.
        // In this example, the loop executes only once because
        // there is only one dropdown.
        for (let ele of listOfDrpdwnElems) {
            // Get the text contained within the dropdown (<select>) element.
            // Because the <select> contains all of the <option> elements,
            // textContent() returns one string containing all option text,
            // separated by newline characters.
            let eleTxt = await ele.textContent();

            // textContent() can return null, so verify that text exists.
            if (eleTxt) {
                // Add the string to our array.
                // Note: The array will contain ONE string that includes
                // all dropdown options, not one array element per option.
                listOfOptions.push(eleTxt);
            }
        }

        // Display the results in the console.
        // The newline characters make the options appear on separate lines.
        console.log(`List of options: ${listOfOptions}`);

        // A MUCH SIMPLER WAY TO GET ALL DROPDOWN VALUES (suggested by ChatGPT)
        const options = await page.locator('select option').allTextContents();

        console.log(`This simpler method also returns the same info: ${options}`);

        // *****************************************
        // 📍***********CHECKBOX*******************
        // *****************************************
        /**
         * @actions
         * 1. ✅Assert the default option - to be checked or unchecked
         * 2. ✅Check / uncheck
         */
        // Check the target checkbox and assert that it is checked
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check(); // Check the Apply for... checkbox
        await expect(page.getByRole('checkbox', { name: 'Apply for hospital readmission' })).toBeChecked(); // Assert it is checked.
        // Uncheck the target checkbox and assert that it is no longer checked
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).uncheck(); // Uncheck the Apply for... checkbox
        await expect(page.getByRole('checkbox', { name: 'Apply for hospital readmission' })).not.toBeChecked(); // Assert it is unchecked.

        // **********************************************************
        // 📍RADIO BUTTON
        // **********************************************************

        // Assert the default (currently selected) option
        await expect(page.getByRole('radio', { name: 'Medicare' })).toBeChecked(); // assert that Medicare radio button is checked/selected

        await page.getByText('Medicaid').check(); // Select the Medicaid radio button
        await expect(page.getByRole('radio', { name: 'Medicare' })).not.toBeChecked(); // assert that Medicare radio button is no longer selected
        await expect(page.getByRole('radio', { name: 'Medicaid' })).toBeChecked(); // assert that the Medicaid button is now selected

        // NOTE FOR ABOVE - you include the locator code several times instead of assigning to a variable.
        // To make the code more clean and easier to read you can update with the following and replace the locator
        // code with the variable name:
        // const readmissionCheckbox = page.getByRole('checkbox', {
        //     name: 'Apply for hospital readmission',
        // });

        // await readmissionCheckbox.check();
        // await expect(readmissionCheckbox).toBeChecked();

        // await readmissionCheckbox.uncheck();
        // await expect(readmissionCheckbox).not.toBeChecked();

        // date input
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('05/10/2027');
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');

        // multi-line comment text
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('This is a multi-line comment\ncaptured by Playwright codegen');

        // click Book Appointment button
        await page.getByRole('button', { name: 'Book Appointment' }).click();

        // Verify appointment confirmation
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
    });
    // More tests go here
});

// The code below was originally generated via codegen and then copied/pasted into the test block.
// We omitted the goto URL line because it's already included in the login code.
// I also removed the redundant steps captured during recording that weren't necessary (field focus, etc.)
// Then I commented out the code below.
// test("test", async ({ page }) => {
//   await page.goto('https://katalon-demo-cura.herokuapp.com/');
//   await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
//   await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
//   await page.getByRole('radio', { name: 'Medicaid' }).check();
//   await page.getByRole('radio', { name: 'Medicaid' }).check();
//   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
//   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('05/10/2027');
//   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');
//   await page.getByRole('textbox', { name: 'Comment' }).click();
//   await page.getByRole('textbox', { name: 'Comment' }).fill('This is a multi-line comment\ncaptured by Playwright codegen');
//   await page.getByRole('button', { name: 'Book Appointment' }).click();
//   await expect(page.locator('h2')).toContainText('Appointment Confirmation');
//   await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
// });
