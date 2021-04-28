import { it, expect } from '@playwright/test';

it('should be alive', async ({page}) => {
  await page.goto('http://localhost:5080/');
  const appname = await page.innerText('#appname');
  expect (appname).toBe('ASSEMBLY');
});