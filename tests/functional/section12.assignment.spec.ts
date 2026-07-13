import { test, expect } from '@playwright/test';

test.describe('Assignment 3', () => {
    test.beforeEach('Login with valid creds', async ({ page }) => {
        // Open the SauceDemo login page.
        await page.goto('https://www.saucedemo.com/');

        // Log in as the standard user.
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Verify successful login.
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('purchase item', async ({ page }) => {
        // Get the first inventory item on the page (index 0).
        let firstItem = page.locator('.inventory_item').nth(0);

        // Store the product name so we can verify it later.
        let productName = await firstItem.locator('.inventory_item_name').textContent();

        // Click the Add to Cart button for the first item.
        await firstItem.locator('button').click();

        // Open the shopping cart.
        await page.locator('[data-test="shopping-cart-link"]').click();
        
        // Verify navigation to the Cart page URL 
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        // Verify cart page header text.
        await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');

        // Verify the correct product is in the cart.
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(productName!);

        // Proceed to checkout.
        await page.locator('[data-test="checkout"]').click();

        // Verify navigation to the checkout step 1 URL
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        // Verify Checkout step 1 header.
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');

        // Fill in customer information.
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('22222');

        // Submit customer information.
        await page.locator('[data-test="continue"]').click();

        // Verify navigation to checkout step 2 URL.
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        // Verify checkout step 2 header.
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');

        // Verify the correct product is still being purchased.
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(productName!);

        // Complete the purchase.
        await page.locator('[data-test="finish"]').click();

        // Verify navigation to the order confirmation page.
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

        // Verify the confirmation message.
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
    });
});
