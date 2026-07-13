/**
 * @scenario
 * 1. Log in as a standard user.
 * 2. Retrieve the name and price of each product.
 *    Note: Prices are initially retrieved as strings and later converted to numbers.
 * 3. Assert that every product has a price greater than zero.
 */

// ‼️ PERSONAL STUDY NOTE:
// A lesson explaining this code was missing. The active code below was copied
// from the associated GitHub repository so the example could still be studied.
//
// The commented section shows the test structure that had been created before
// the completed iteration and price-validation logic was added.
//
// import { test, expect } from '@playwright/test';

// // The describe block groups tests for the Inventory feature.
// test.describe('Inventory feature', () => {
//     // This hook logs in before each test inside this describe block.
//     test.beforeEach('Login with valid creds', async ({ page }) => {
//         // Open the SauceDemo login page.
//         await page.goto('https://www.saucedemo.com/');

//         // Enter valid credentials and submit the login form.
//         await page.locator('[data-test="username"]').fill('standard_user');
//         await page.locator('[data-test="password"]').fill('secret_sauce');
//         await page.locator('[data-test="login-button"]').click();

//         // Verify that login redirected the user to the inventory page.
//         // The regular expression allows the assertion to match a URL
//         // containing "/inventory" without requiring the entire exact URL.
//         await expect(page).toHaveURL(/.*\/inventory/);
//     });

//     test('Should confirm all prices are non-zero values', async ({ page }) => {});
// });

import { test, expect } from "@playwright/test";

/**
 * Scenario:
 * 1. ✅ Log in as a standard user.
 * 2. ✅ Retrieve the name and price of each product.
 * 3. ✅ Assert that every product has a price greater than zero.
 *
 * @locators
 * 1. .inventory_item       -> each complete product card
 * 2. .inventory_item_name  -> the product name within a product card
 * 3. .inventory_item_price -> the product price within a product card
 */

test.describe("Inventory feature", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
        // Open the SauceDemo login page.
        await page.goto("https://www.saucedemo.com/");

        // Enter valid credentials and submit the login form.
        await page.locator('[data-test="username"]').fill("standard_user");
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.locator('[data-test="login-button"]').click();

        // Verify that login redirected the user to the inventory page.
        // The first assertion checks the complete URL exactly.
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        // The second assertion uses a regular expression and checks that
        // the URL contains "/inventory".
        await expect(page).toHaveURL(/.*\/inventory/);
    });

    test("Should confirm all prices are non-zero values", async ({ page }) => {
        // Create a locator representing all product cards on the page.
        let productsElms = page.locator(".inventory_item");

        // Verify that the inventory page currently displays six products.
        // If this assertion fails, the test stops and the remaining steps do not run.
        await expect(productsElms).toHaveCount(6);

        // Retrieve the actual number of product cards matched by the locator.
        // This value controls how many times the loop executes.
        let totalProducts = await productsElms.count();

        // Create an empty array that will store each price as a string.
        let priceArr = [];

        // Iterate once for each product.
        // The index starts at 0 and continues while it is less than totalProducts.
        for (let i = 0; i < totalProducts; i++) {
            // Create a locator for the product card at the current index.
            // nth(0) is the first product, nth(1) is the second, and so on.
            let eleNode = productsElms.nth(i);

            // Locate the product name inside the current product card
            // and retrieve its visible text.
            let productName = await eleNode.locator(".inventory_item_name").innerText();

            // Locate the price inside the current product card
            // and retrieve its visible text, such as "$29.99".
            let price = await eleNode.locator(".inventory_item_price").innerText();

            // Display the current product name and price in the console.
            console.log(`Product: ${productName}, price: ${price}`);

            // Add the current price string to the end of the price array.
            priceArr.push(price);
        }

        // Display the original array of price strings.
        // Example: ["$29.99", "$9.99", "$15.99", ...]
        console.log(`Original Price Array: ${priceArr}`);

        /**
         * Original string array:
         * [$29.99,$9.99,$15.99,$49.99,$7.99,$15.99]
         *
         * Conversion process:
         * 1. Remove the "$" character from each price string.
         * 2. Convert each remaining string into a floating-point number.
         *
         * Resulting number array:
         * [29.99,9.99,15.99,49.99,7.99,15.99]
         */

        // map() processes every item in priceArr and creates a new array.
        // For each price:
        //   1. replace("$", "") removes the dollar sign.
        //   2. parseFloat() converts the remaining string into a number.
        let priceArrNum = priceArr.map((item) => parseFloat(item.replace("$", "")));

        // Display the converted array of numeric prices.
        console.log(`>> Modified arr: ${priceArrNum}`);

        // Create a new array containing only invalid prices:
        // values that are less than or equal to zero.
        let priceArrWithInvalidVals = priceArrNum.filter((item) => item <= 0);

        // Report whether any invalid price values were found.
        // If all prices are valid, filter() returns an empty array.
        if (priceArrWithInvalidVals.length > 0) {
            console.log(`ERROR: Zero or negative price values found: ${priceArrWithInvalidVals}`);
        } else {
            console.log(`INFO: All prices are greater than zero.`);
        }

        // Verify that the array of invalid prices contains no items.
        expect(priceArrWithInvalidVals).toHaveLength(0);
    });
});