import {test,expect} from '@playwright/test';

async function getOtp(request, email) {
    for (let i = 0; i < 25; i++) {
        const res = await request.get(`https://api.catchmail.io/api/v1/mailbox?address=${email}`);
        const { messages } = res.ok() ? await res.json() : {};
        if (messages?.length) {
            const detail = await request.get(`https://api.catchmail.io/api/v1/message/${messages[0].id}?mailbox=${email}`);
            const { body } = await detail.json();
            const text = body?.text || body?.html || '';
            const match = text.match(/code:\s*(\d{6})/i) || text.match(/\b\d{6}\b/);
            if (match) return match[1] || match[0];
        }
        await new Promise(r => setTimeout(r, 1500));
    }
    throw new Error('OTP not found');
}

test('Sign up',async({page,request})=>{
        test.setTimeout(90000);

        await page.goto("https://authorized-partner.vercel.app/");
        await page.getByRole("button",{name:"Get Started"}).first().click();
        await page.locator("#remember").check();
        await page.getByText("Continue").click();
        await page.getByLabel("First Name").fill("Roshik");
        await page.getByLabel("Last Name").fill("Maharjan");
        const tempEmail = `vrit_test_${Math.floor(100000 + Math.random() * 900000)}@catchmail.io`;
        await page.getByLabel("Email Address").fill(tempEmail);
        const number = Math.random();
        await page.locator('[name="phoneNumber"]').fill(`${number}`);
        await page.locator("[name='password']").fill("Roshik@123");
        await page.locator("[name='confirmPassword']").fill("Roshik@123");
        await page.getByRole("button",{name:"Next"}).click();
        await page.waitForLoadState("networkidle");
        const otpCode = await getOtp(request, tempEmail);
        await page.locator("[autocomplete='one-time-code']").fill(otpCode);
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
        await page.locator(".pb-6").waitFor();
        await page.locator('[role="combobox"]').click();
        await page.locator('select').selectOption("1");
        await page.getByPlaceholder("Enter an approximate number.").fill("10");
        await page.getByLabel("Focus Area").fill("College Student");
        await page.getByLabel("Success Metrics").fill("80");
        await page.locator('[role="checkbox"]').nth(0).check();
        await page.locator('[role="checkbox"]').nth(1).check();
        await page.getByRole("button",{name:"Next"}).click();
    
        await page.getByPlaceholder("Enter your registration number").fill("12345");
        await page.locator('[role="combobox"]').click();
        await page.getByText("Nepal").click();
        await page.locator("[role='checkbox']").first().check();
        await page.locator("[role='checkbox']").last().check();
        await page.getByLabel("Certification Details (Optional)").fill("ABC certificate");
         await page.locator("[type='file']").first().setInputFiles("E:/Downloads/abc.pdf");
           await page.locator("[type='file']").last().setInputFiles("E:/Downloads/abc.pdf");
           await page.getByText("Submit").click();


    
});