import {test,expect} from '@playwright/test';
test('dashboard accepts candidate input',async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{name:/MailVerify/})).toBeVisible();await page.locator('textarea').fill('person@example.com');await expect(page.getByRole('button',{name:'Verify candidates'})).toBeEnabled();});
