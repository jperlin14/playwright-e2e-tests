import { expect, type Page } from '@playwright/test';
import BasePage from './base.page.js';
import { log } from '../helpers/logger.js';

export default class HomePage extends BasePage {
    // Constructor
    constructor(page: Page) {
        // 'super' allows us to call the constructor of the parent class (BasePage) and pass the page object to it.
        super(page);
    }

    // Elements
    // Note: To capture the locator for the elements, I used the Playwright codegen tool to generate the selectors in another test file (test-3.spec.ts),
    // and then I copied the selectors into this page object class. This approach allows us to maintain a clear separation between the test logic
    // and the page structure, making our tests more maintainable and easier to read.
    get userNameInputBox() {
        return this.page.getByRole('textbox', { name: 'Email:' });
    }

    get passwordInputBox() {
        return this.page.getByRole('textbox', { name: 'Password:' });
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'Log in' });
    }

    // Page Actions
    async loginToNopCommerceApp(url: string, username: string, password: string) {
        await log('info', `Navigating to the URL: ${url}`);
        // Login to the nopCommerce application
        await this.navigateTo(url);
        await this.typeInto(this.userNameInputBox, username);
        await this.typeInto(this.passwordInputBox, password);
        await this.click(this.loginButton);
        // Assert the URL after login to ensure we are on the correct page
        await expect(this.page).toHaveURL(`${url}admin/`);
        await log('info', `Successfully logged in to the nopCommerce application with username: ${username}`);

        // Add more page specific actions here as needed.
    }
}

