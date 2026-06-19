import {test,expect} from '@playwright/test';

test('Sign up',async({page})=>{

        await page.goto("https://authorized-partner.vercel.app/");
        await page.getByRole("button",{name:"Get Started"}).first().click();
        await page.locator("#remember").check();
        await page.getByText("Continue").click();
        await page.getByLabel("First Name").fill("Roshik");
        await page.getByLabel("Last Name").fill("Maharjan");
        await page.getByLabel("Email Address").fill("roshik@mail7.app");
        await page.locator('[name="phoneNumber"]').fill("1");
        await page.locator("[name='password']").fill("Roshik@123");
        await page.locator("[name='confirmPassword']").fill("Roshik@123");
        await page.getByRole("button",{name:"Next"}).click();
        await page.waitForLoadState("networkidle");
        await page.locator("[autocomplete='one-time-code']").fill("123456");
        await page.locator("[type='submit']").click();
        await page.getByLabel("Name").fill("Abc company");
        await page.getByLabel("Role in Agency").fill("QA");
        await page.getByLabel("Email Address").fill("abc@gmail.com");
        await page.getByLabel("Website").fill("abc.com");
        await page.getByPlaceholder("Enter Your Agency Address").fill("Kathmandu");
        await page.locator('[role="combobox"]').click();
        await page.getByPlaceholder("Search...").pressSequentially("Nep");
        await page.getByText("Nepal").click();
        await page.getByRole("button",{name:"Next"}).click();


    
});