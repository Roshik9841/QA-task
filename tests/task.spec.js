import { test,expect } from '@playwright/test';
import { SetupAccountPage } from '../pages/SetupAccountPage.js';
import { AgencyDetailsPage } from '../pages/AgencyDetailsPage.js';
import { ProfessionalExperiencePage } from '../pages/ProfessionalExperiencePage.js';
import { VerificationPreferencesPage } from '../pages/VerificationPreferencesPage.js';

async function getOtp(request, email) {
    for (let i = 0; i < 25; i++) {
        const res = await request.get(`https://api.catchmail.io/api/v1/mailbox?address=${email}`);
        const { messages } = res.ok() ? await res.json() : {};
        if (messages.length>0) {
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

test('Sign up', async ({ page, request }) => {

    const tempEmail = `vrit_test_${Math.floor(Math.random()*100000)}@catchmail.io`;

    // Step 1: Set up your Account
    const setupPage = new SetupAccountPage(page);
    await setupPage.goto();
    await setupPage.fill(tempEmail);
    await page.waitForLoadState('networkidle');
    const otp = await getOtp(request, tempEmail);
    await setupPage.verifyOtp(otp);
    await expect(page.locator('li[role="status"]')).toBeVisible();

    // Step 2: Agency Details
    const agencyPage = new AgencyDetailsPage(page);
    await agencyPage.fill();
     await expect(page.locator('li[role="status"]')).toContainText("Agency Details Added Successfully");

    // Step 3: Professional Experience
    const experiencePage = new ProfessionalExperiencePage(page);
    await experiencePage.fill();
     await expect(page.locator('li[role="status"]')).toHaveText("Professional Experience Added successfully.");

    // Step 4: Verification and Preferences
    const verificationPage = new VerificationPreferencesPage(page);
    await verificationPage.fill();

});