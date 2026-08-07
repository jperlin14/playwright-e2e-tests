import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Launch the browser and navigate to the nopCommerce admin demo site
    await page.goto('https://admin-demo.nopcommerce.com/');

    // Login
    await page.getByLabel('Email').fill('admin@yourstore.com');
    await page.getByLabel('Password').fill('admin');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Test website had CloudFlare protection - so we need to add an .auth folder 
    // to store the authenticated state for future tests.
    // This issue was preventing CodeGen from generating the code for the login steps, 
    // so I had to set the authentication state using the .json file in the .auth folder.
    // Save the authenticated browser state:
    // await page.context().storageState({
    //     path: '.auth/nopcommerce.json',
    // });

    // Assert the URL after login to ensure we are on the correct page
    await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/');
});