// Records one continuous video walking through every problem_user defect, with an
// on-screen caption per bug and a red outline on the broken element.
// Usage: node scripts/record-walkthrough.ts [output.webm]
import { chromium, selectors, type Locator, type Page } from '@playwright/test';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { PASSWORD, USERS } from '../test-data/users.ts';
import { CUSTOMER, PRODUCTS } from '../test-data/products.ts';

const output = process.argv[2] ?? join(homedir(), 'Desktop', 'saucedemo-bug-walkthrough.webm');
const checkpoints = process.env.CHECKPOINT_DIR;
const size = { width: 1280, height: 720 };

selectors.setTestIdAttribute('data-test');
const browser = await chromium.launch({ slowMo: 350 });
const context = await browser.newContext({ viewport: size, recordVideo: { dir: 'test-results/walkthrough', size } });
const page = await context.newPage();
let step = 0;

async function caption(title: string, detail: string) {
  await page.evaluate(([t, d]) => {
    let el = document.getElementById('qa-caption');
    if (!el) {
      el = document.createElement('div');
      el.id = 'qa-caption';
      el.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;padding:14px 24px;background:rgba(17,24,39,.92);color:#fff;font:16px/1.4 -apple-system,Helvetica,sans-serif;pointer-events:none';
      document.body.appendChild(el);
    }
    el.innerHTML = `<div style="font-weight:700;font-size:19px;color:#fca5a5">${t}</div><div>${d}</div>`;
  }, [title, detail]);
}

async function highlight(locator: Locator) {
  await locator.evaluateAll(els => els.forEach(e => ((e as HTMLElement).style.outline = '4px solid #dc2626')));
}

async function hold(ms = 2500) {
  if (checkpoints) await page.screenshot({ path: join(checkpoints, `${String(++step).padStart(2, '0')}.png`) });
  await page.waitForTimeout(ms);
}

async function resetCart(p: Page) {
  await p.evaluate(() => localStorage.removeItem('cart-contents'));
  await p.goto('https://www.saucedemo.com/inventory.html');
}

const item = (name: string) => page.locator('[data-test="inventory-item"]').filter({ hasText: name });

// Intro + login
await page.goto('https://www.saucedemo.com/');
await caption('saucedemo.com — defect walkthrough', `7 defects found as ${USERS.problem}. ${USERS.standard} works correctly for every step shown.`);
await hold(3000);
await page.getByTestId('username').pressSequentially(USERS.problem, { delay: 60 });
await page.getByTestId('password').pressSequentially(PASSWORD, { delay: 60 });
await page.getByTestId('login-button').click();

// BUG-006
await caption('BUG-006 · Medium / P2 · Every product shows the same placeholder image', 'All six products show the same dog photo instead of their own picture.');
await highlight(page.locator('img.inventory_item_img'));
await hold(4000);

// BUG-005
await caption('BUG-005 · Medium / P3 · Sort dropdown has no effect', 'Choosing "Name (Z to A)"… the list stays in A to Z order.');
await hold(1500);
await page.getByTestId('product-sort-container').selectOption('za');
await highlight(page.getByTestId('inventory-item-name').first());
await caption('BUG-005 · Medium / P3 · Sort dropdown has no effect', 'After choosing Z to A, "Sauce Labs Backpack" is still first.');
await hold(3500);

// BUG-002
await caption('BUG-002 · High / P2 · Add to cart fails for 3 of 6 products', 'Clicking Add to cart on all six products…');
for (const { name } of PRODUCTS) await item(name).getByRole('button', { name: 'Add to cart' }).click();
for (const name of ['Bolt T-Shirt', 'Fleece Jacket', 'Test.allTheThings']) await highlight(item(name).getByRole('button'));
await highlight(page.getByTestId('shopping-cart-badge'));
await caption('BUG-002 · High / P2 · Add to cart fails for 3 of 6 products', 'Bolt T-Shirt, Fleece Jacket and Red T-Shirt still say "Add to cart". Cart badge shows 3, not 6.');
await page.mouse.wheel(0, 300);
await hold(4500);
await page.mouse.wheel(0, -300);

// BUG-003
await caption('BUG-003 · High / P2 · Remove does nothing on the Products page', 'Clicking Remove on Sauce Labs Backpack…');
await hold(1200);
await item('Sauce Labs Backpack').getByRole('button', { name: 'Remove' }).click();
await highlight(item('Sauce Labs Backpack').getByRole('button'));
await highlight(page.getByTestId('shopping-cart-badge'));
await caption('BUG-003 · High / P2 · Remove does nothing on the Products page', 'The button still says "Remove" and the badge still shows 3.');
await hold(3500);

// BUG-004
await resetCart(page);
await caption('BUG-004 · High / P2 · Product link opens the wrong product', 'Clicking "Sauce Labs Backpack"…');
await highlight(page.getByTestId('inventory-item-name').filter({ hasText: 'Sauce Labs Backpack' }));
await hold(1800);
await page.getByTestId('inventory-item-name').filter({ hasText: 'Sauce Labs Backpack' }).click();
await page.getByTestId('back-to-products').waitFor();
await caption('BUG-004 · High / P2 · Product link opens the wrong product', 'The page that opens is Sauce Labs Fleece Jacket ($49.99), not the Backpack ($29.99).');
await highlight(page.locator('.inventory_details_name'));
await hold(4000);

// BUG-007
await page.getByTestId('back-to-products').click();
await caption('BUG-007 · High / P2 · Fleece Jacket opens "ITEM NOT FOUND"', 'Clicking "Sauce Labs Fleece Jacket"…');
await hold(1500);
await page.getByTestId('inventory-item-name').filter({ hasText: 'Sauce Labs Fleece Jacket' }).click();
await page.getByTestId('back-to-products').waitFor();
await highlight(page.locator('.inventory_details_name, .inventory_details_price'));
await caption('BUG-007 · High / P2 · Fleece Jacket opens "ITEM NOT FOUND"', 'Title "ITEM NOT FOUND", placeholder text, price "$√-1". Now clicking Add to cart…');
await hold(4000);
await page.getByRole('button', { name: 'Add to cart' }).click();
await highlight(page.getByTestId('shopping-cart-badge'));
await hold(1500);
await page.getByTestId('shopping-cart-link').click();
await highlight(page.getByTestId('shopping-cart-badge'));
await caption('BUG-007 · High / P2 · Phantom cart item', 'The badge says 1 item, but the cart is empty: a product that does not exist was stored.');
await hold(4000);

// BUG-001
await resetCart(page);
await caption('BUG-001 · Critical / P1 · Checkout cannot be completed', 'Adding the Backpack and going to checkout…');
await item('Sauce Labs Backpack').getByRole('button', { name: 'Add to cart' }).click();
await page.getByTestId('shopping-cart-link').click();
await page.getByTestId('checkout').click();
await caption('BUG-001 · Critical / P1 · Checkout cannot be completed', `Typing First Name "${CUSTOMER.firstName}", then Last Name "${CUSTOMER.lastName}"…`);
await page.getByTestId('firstName').pressSequentially(CUSTOMER.firstName, { delay: 120 });
await hold(800);
await page.getByTestId('lastName').pressSequentially(CUSTOMER.lastName, { delay: 120 });
await page.getByTestId('postalCode').pressSequentially(CUSTOMER.postalCode, { delay: 120 });
await highlight(page.locator('[data-test="firstName"], [data-test="lastName"]'));
const firstNow = await page.getByTestId('firstName').inputValue();
const lastNow = await page.getByTestId('lastName').inputValue();
await caption('BUG-001 · Critical / P1 · Checkout cannot be completed', `Each letter typed into Last Name replaced First Name. First Name is now "${firstNow}", Last Name is ${lastNow ? `"${lastNow}"` : "empty"}.`);
await hold(4000);
await page.getByTestId('continue').click();
await highlight(page.getByTestId('error'));
await caption('BUG-001 · Critical / P1 · Checkout cannot be completed', '"Error: Last Name is required" — the order cannot be placed.');
await hold(4500);

await caption('End of walkthrough — 7 defects', 'Reports, screenshots and automated tests: github.com/annemarywynter1986/saucedemo-qa');
await hold(3500);

const video = page.video()!;
await context.close();
await video.saveAs(output);
await browser.close();
console.log(`Saved ${output}`);
