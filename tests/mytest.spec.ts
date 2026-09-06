import { test, expect } from '@playwright/test';

// Playwright gives each test a fresh browser context, so login and cart state are not shared.
test('successful login', async ({ page }) => {
  // Log in with the demo account and check that the inventory page opens.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  // Finish the authenticated test by logging out and checking the login page.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
});

test('add product to cart after login', async ({ page }) => {
  // This test logs in itself instead of relying on the previous test.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Add one product and check both its button state and the cart count.
  await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await expect(page.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Logout is part of this test too, rather than a separate test.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
});

test('failed login with wrong password', async ({ page }) => {
  // A rejected login is the expected result here, so the test should pass.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true })
  ).toBeVisible();
});

