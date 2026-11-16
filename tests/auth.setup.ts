import { test as setup, expect } from '../fixtures/test.ts';
import { STORAGE_STATE } from '../playwright.config.ts';
import { PASSWORD, USERS } from '../test-data/users.ts';

const sessions = [
  { user: USERS.standard, file: STORAGE_STATE.standard },
  { user: USERS.problem, file: STORAGE_STATE.problem },
];

for (const { user, file } of sessions) {
  setup(`authenticate as ${user}`, async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(user, PASSWORD);
    await expect(inventoryPage.title).toHaveText('Products');
    await page.context().storageState({ path: file });
  });
}
