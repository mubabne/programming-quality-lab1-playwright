# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mytest.spec.ts >> successful login
- Location: tests\mytest.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Products - intentional failure', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Products - intentional failure', { exact: true }) with timeout 5000ms
  - waiting for getByText('Products - intentional failure', { exact: true })

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: Swag Labs Products Name (A to Z)
- combobox:
  - option "Name (A to Z)" [selected]
  - option "Name (Z to A)"
  - option "Price (low to high)"
  - option "Price (high to low)"
- link "Sauce Labs Backpack":
  - /url: "#"
  - img "Sauce Labs Backpack"
- link "Sauce Labs Backpack":
  - /url: "#"
- text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
- button "Add to cart"
- link "Sauce Labs Bike Light":
  - /url: "#"
  - img "Sauce Labs Bike Light"
- link "Sauce Labs Bike Light":
  - /url: "#"
- text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
- button "Add to cart"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
  - img "Sauce Labs Bolt T-Shirt"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
- text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
- button "Add to cart"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
  - img "Sauce Labs Fleece Jacket"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
- text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
- button "Add to cart"
- link "Sauce Labs Onesie":
  - /url: "#"
  - img "Sauce Labs Onesie"
- link "Sauce Labs Onesie":
  - /url: "#"
- text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
- button "Add to cart"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
  - img "Test.allTheThings() T-Shirt (Red)"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
- text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
- button "Add to cart"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('successful login', async ({ page }) => {
  4  |   await page.goto('https://www.saucedemo.com/');
  5  |   await page.getByPlaceholder('Username').fill('standard_user');
  6  |   await page.getByPlaceholder('Password').fill('secret_sauce');
  7  |   await page.getByRole('button', { name: 'Login', exact: true }).click();
  8  |   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
> 9  |   await expect(page.getByText('Products - intentional failure', { exact: true })).toBeVisible();
     |                                                                                   ^ Error: expect(locator).toBeVisible() failed
  10 | 
  11 |   await page.getByRole('button', { name: 'Open Menu' }).click();
  12 |   await page.getByRole('link', { name: 'Logout', exact: true }).click();
  13 |   await expect(page).toHaveURL('https://www.saucedemo.com/');
  14 |   await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
  15 | });
  16 | 
  17 | test('add product to cart after login', async ({ page }) => {
  18 |   await page.goto('https://www.saucedemo.com/');
  19 |   await page.getByPlaceholder('Username').fill('standard_user');
  20 |   await page.getByPlaceholder('Password').fill('secret_sauce');
  21 |   await page.getByRole('button', { name: 'Login', exact: true }).click();
  22 | 
  23 |   await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
  24 |   await expect(page.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
  25 |   await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  26 | 
  27 |   await page.getByRole('button', { name: 'Open Menu' }).click();
  28 |   await page.getByRole('link', { name: 'Logout', exact: true }).click();
  29 |   await expect(page).toHaveURL('https://www.saucedemo.com/');
  30 |   await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
  31 | });
  32 | 
  33 | test('failed login with wrong password', async ({ page }) => {
  34 |   await page.goto('https://www.saucedemo.com/');
  35 |   await page.getByPlaceholder('Username').fill('standard_user');
  36 |   await page.getByPlaceholder('Password').fill('wrong_password');
  37 |   await page.getByRole('button', { name: 'Login', exact: true }).click();
  38 | 
  39 |   await expect(page).toHaveURL('https://www.saucedemo.com/');
  40 |   await expect(
  41 |     page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true })
  42 |   ).toBeVisible();
  43 | });
  44 | 
  45 | 
```