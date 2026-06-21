export class SetupAccountPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://authorized-partner.vercel.app/');
        await this.page.getByRole('button', { name: 'Get Started' }).first().click();
        await this.page.locator('#remember').check();
        await this.page.getByText('Continue').click();
    }

    async fill(email) {
        await this.page.getByLabel('First Name').fill('Roshik');
        await this.page.getByLabel('Last Name').fill('Maharjan');
        await this.page.getByLabel('Email Address').fill(email);
        await this.page.locator('[name="phoneNumber"]').fill(`${Math.random()}`);
        await this.page.locator("[name='password']").fill('Roshik@123');
        await this.page.locator("[name='confirmPassword']").fill('Roshik@123');
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async verifyOtp(otp) {
        await this.page.locator("[autocomplete='one-time-code']").fill(otp);
        await this.page.locator("[type='submit']").click();
    }

    
}
