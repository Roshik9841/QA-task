export class VerificationPreferencesPage {
    constructor(page) {
        this.page = page;
    }

    async fill() {
        await this.page.getByPlaceholder('Enter your registration number').fill('12345');
        await this.page.locator('[role="combobox"]').click();
        await this.page.getByText('Nepal').click();
        await this.page.locator("[role='checkbox']").first().check();
        await this.page.locator("[role='checkbox']").last().check();
        await this.page.getByLabel('Certification Details (Optional)').fill('ABC certificate');
        await this.page.locator("[type='file']").first().setInputFiles('E:/Downloads/abc.pdf');
        await this.page.locator("[type='file']").last().setInputFiles('E:/Downloads/abc.pdf');
        await this.page.getByText('Submit').click();
    }
}
