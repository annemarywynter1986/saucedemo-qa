import { test, expect } from '../../fixtures/test.ts';
import { PASSWORD, USERS } from '../../test-data/users.ts';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  for (const user of [USERS.standard, USERS.problem]) {
    test(`${user} can log in and reach the inventory`, { tag: '@smoke' }, async ({ page, loginPage, inventoryPage }) => {
      await loginPage.login(user, PASSWORD);
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.title).toHaveText('Products');
      await expect(inventoryPage.items).toHaveCount(6);
    });
  }

  test('locked_out_user is refused with a clear message', async ({ page, loginPage }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await expect(loginPage.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('/');
  });

  test('wrong password is refused', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, 'wrong_password');
    await expect(loginPage.error).toContainText('Username and password do not match');
  });

  test('inventory is not reachable without a session', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toContainText("You can only access '/inventory.html' when you are logged in.");
  });
});
