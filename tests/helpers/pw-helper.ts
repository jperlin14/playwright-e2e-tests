import { test, type Page, type Locator } from '@playwright/test';

// Take a screenshot of a full page
// @param page - The Playwright Page object representing the browser page.
// @param screenshotName - The name of the screenshot file to be saved.

// Full page screenshot
async function takeFullPageScreenshot(page: Page, screenshotName: string): Promise<void> {
    const screenshot = await page.screenshot({ fullPage: true });
    // Attach the screenshot to the test report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: 'image/png',
    });
}

// Element screenshot
async function takeElementScreenshot(element: Locator, screenshotName: string): Promise<void> {
    const screenshot = await element.screenshot();
    // Attach the screenshot to the test report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: 'image/png',
    });
}

// More helper functions can be added here as needed

export default { takeFullPageScreenshot, takeElementScreenshot };