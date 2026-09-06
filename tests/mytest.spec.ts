import { test, expect } from '@playwright/test';

// Тест бүр шинэ орчинд эхэлнэ.
test('Зөв нууц үгээр нэвтрэх', async ({ page }) => {
  // Нэвтрээд барааны хуудсыг шалгана.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  // Гараад нэвтрэх хуудас руу буцсаныг шалгана.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
});

test('Бараа сагсанд нэмэх', async ({ page }) => {
  // Өмнөх тестээс хамаарахгүйгээр нэвтэрнэ.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Нэг бараа нэмээд товч болон сагсны тоог шалгана.
  await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  await expect(page.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Тестийн төгсгөлд гарна.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
});

test('Буруу нууц үгээр нэвтрэх', async ({ page }) => {
  // Нэвтрэхгүй, алдааны мэдэгдэл гарах ёстой.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true })
  ).toBeVisible();
});

