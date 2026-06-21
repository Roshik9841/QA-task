export class AgencyDetailsPage {
    constructor(page) {
        this.page = page;
    }

    async fill() {
        await this.page.getByLabel('Name').fill('Abc company');
        await this.page.getByLabel('Role in Agency').fill('QA');
        await this.page.getByLabel('Email Address').fill('abc@gmail.com');
        await this.page.getByLabel('Website').fill('abc.com');
        await this.page.getByPlaceholder('Enter Your Agency Address').fill('Kathmandu');
        await this.page.locator('[role="combobox"]').click();
        await this.page.getByPlaceholder('Search...').pressSequentially('Nep');
        await this.page.getByText('Nepal').click();
        await this.page.getByRole('button', { name: 'Next' }).click();
    }
}
