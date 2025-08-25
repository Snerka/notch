import { Page, Locator } from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly phoneNumberField: Locator;
    readonly hearAboutSelect: Locator;
    readonly hearAboutOptions: Locator;
    readonly company: Locator;
    readonly budgetSelect: Locator;
    readonly budgetOptions: Locator;
    readonly servicesContainer: Locator;
    readonly projectDescription: Locator;
    readonly fileInput: Locator;
    readonly termsCheckbox: Locator;
    readonly sendMessageBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('input[placeholder="First name*"]');
        this.lastNameField = page.locator('input[placeholder="Last name*"]')
        this.emailField = page.locator('input[placeholder="Email*"]');
        this.phoneNumberField = page.locator('input[placeholder="Phone number"]');
        this.company = page.locator('input[placeholder="Company"]');
        this.projectDescription = page.locator('#input_7_15');

        //Hear about dropdown
        this.hearAboutSelect = page.locator('#input_7_9_chosen'); // visible dropdown
        this.hearAboutOptions = this.hearAboutSelect.locator('.chosen-results li'); // list items

        // Budget dropdown
        this.budgetSelect = page.locator('#input_7_12_chosen'); // visible dropdown
        this.budgetOptions = this.budgetSelect.locator('.chosen-results li'); // list items

        this.servicesContainer = page.locator('#input_7_14');
        this.fileInput = page.locator('#field_7_3 input[type="file"]');
        this.termsCheckbox = page.locator('#field_7_16 input[type="checkbox"]');
        this.sendMessageBtn = page.locator('#gform_submit_button_7');
    }

    async navigate() {
        await this.page.goto('/qa_task/');
    }

    async acceptCookies() {
        const acceptButton = this.page.locator('button[data-cky-tag="accept-button"]');
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }
    }

    // Hear About dropdown
    async selectHearAbout(optionText: string) {
        await this.hearAboutSelect.click(); // open dropdown
        const option = this.hearAboutOptions.filter({ hasText: optionText });
        await option.click();
    }

    // Budget dropdown
    async selectBudget(optionText: string) {
        await this.budgetSelect.click(); // open dropdown
        const option = this.budgetOptions.filter({ hasText: optionText });
        await option.click();
    }

    /** Select one or more services by label text */
    async selectServices(services: string[]) {
        for (const service of services) {
            const checkboxLabel = this.servicesContainer.locator(`label:text-is("${service}")`);
            await checkboxLabel.click();
        }
    }

    /** Get all available services */
    async getAvailableServices(): Promise<string[]> {
        return this.servicesContainer.locator('label').allTextContents();
    }

    /** Fill project description */
    async fillProjectDescription(text: string) {
        await this.projectDescription.fill(text);
    }

    /** Upload files and wait until progress reaches 100% */
    async uploadFiles(files: string | string[]) {
        await this.fileInput.setInputFiles(files);
        await this.page.waitForTimeout(1000);
    }

    async acceptTerms() {
        if (!(await this.termsCheckbox.isChecked())) {
            await this.termsCheckbox.check();
        }
    }

    async sendMessage() {
        await this.sendMessageBtn.click();
    }
}
