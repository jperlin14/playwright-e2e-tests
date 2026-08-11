import { type Page, type Locator } from '@playwright/test';
import BasePage from './base.page.js';

export default class MakeAppointmentPage extends BasePage {
    readonly facilityDropdown: Locator;
    readonly readmissionCheckbox: Locator;
    readonly visitDateInput: Locator;
    readonly commentInput: Locator;
    readonly bookAppointmentButton: Locator;

    constructor(page: Page) {
        super(page);
        this.facilityDropdown = page.getByLabel('Facility');
        this.readmissionCheckbox = page.getByRole('checkbox', {
            name: 'Apply for hospital readmission',
        });
        this.visitDateInput = page.getByRole('textbox', {
            name: 'Visit Date (Required)',
        });
        this.commentInput = page.getByRole('textbox', {
            name: 'Comment',
        });
        this.bookAppointmentButton = page.getByRole('button', { name: 'Book Appointment' });
    }

    async selectFacility(facilityName: string) {
        await this.facilityDropdown.selectOption(facilityName);
    }

    async setReadmissionCheckbox(checked: boolean) {
        await this.readmissionCheckbox.setChecked(checked);
    }

    async selectHealthcareProgram(program: string) {
        await this.page.getByRole('radio', { name: program }).check();
    }

    async setVisitDate(date: string) {
        await this.visitDateInput.fill(date);
        await this.visitDateInput.press('Enter');
    }

    async setComment(comment: string) {
        await this.commentInput.fill(comment);
    }

    async clickBookAppointment() {
        await this.click(this.bookAppointmentButton);
    }
}
