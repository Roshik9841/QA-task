export class ProfessionalExperiencePage {
    constructor(page) {
        this.page = page;
    }

    async fill() {
        await this.page.locator('.pb-6').waitFor();
        await this.page.locator('[role="combobox"]').click();
        await this.page.locator('select').selectOption('1');
        await this.page.getByPlaceholder('Enter an approximate number.').fill('10');
        await this.page.getByLabel('Focus Area').fill('College Student');
        await this.page.getByLabel('Success Metrics').fill('80');
        await this.page.locator('[role="checkbox"]').nth(0).check();
        await this.page.locator('[role="checkbox"]').nth(1).check();
        await this.page.getByRole('button', { name: 'Next' }).click();
    }
}
