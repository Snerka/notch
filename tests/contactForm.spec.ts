import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';
import { hearAboutOptions, budgetOptions, servicesOptions } from '../utils/testData';

test.describe('Contact Form Automation', () => {
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();
        await contactPage.acceptCookies();
    });

    test('Full form submission should pass', async () => {
        await contactPage.firstNameField.fill('Valentino');
        await contactPage.lastNameField.fill('Kašner');
        await contactPage.emailField.fill('valentino@test.com');
        await contactPage.phoneNumberField.fill('+385912345678');
        await contactPage.company.fill('Notch');

        await contactPage.selectHearAbout(hearAboutOptions[1]);
        await contactPage.selectBudget(budgetOptions[2]);
        await contactPage.selectServices([servicesOptions[0], servicesOptions[5]]);
        await contactPage.fillProjectDescription('Test project description.');

        await contactPage.uploadFiles(['./tests/files/sample.pdf']);
        await contactPage.acceptTerms();
        await contactPage.sendMessage();

        const successMessage = contactPage.page.locator('#gform_confirmation_message_7');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText(/Thanks for contacting us! We will get in touch with you shortly\./i);

    });

    test('Submitting empty form should fail', async () => {
        await contactPage.sendMessage();

        const errorMessages = contactPage.page.locator('.gfield_validation_message');

        // Wait for at least one message to appear
        await errorMessages.first().waitFor({ state: 'visible', timeout: 5000 });

        const count = await errorMessages.count();
        expect(count).toBeGreaterThan(0);
    });

});
