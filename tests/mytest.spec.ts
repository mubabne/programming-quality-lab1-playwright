import { test, expect } from '@playwright/test';

test('successful login', async ({ page }) => 
{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
}); 

test('add product to cart after login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await expect(page.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('failed login with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true })
  ).toBeVisible();
});

