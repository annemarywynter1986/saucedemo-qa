# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: problem-user/known-defects.spec.ts >> Known defects – problem_user >> BUG-004 product link opens the product that was clicked
- Location: tests/problem-user/known-defects.spec.ts:74:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://www.saucedemo.com/inventory-item.html?id=4"
Received: "https://www.saucedemo.com/inventory-item.html?id=5"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://www.saucedemo.com/inventory-item.html?id=5"

```

```yaml
- banner:
  - button "Open Menu"
  - img "Open Menu"
  - text: Swag Labs
  - button "Cart, empty"
  - button "Back to products"
- main:
  - img "Sauce Labs Fleece Jacket"
  - text: Sauce Labs Fleece Jacket It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
  - button "Add to cart"
- contentinfo:
  - list:
    - listitem:
      - link "X":
        - /url: https://x.com/saucelabs
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
  1   | import { test, expect } from '../../fixtures/test.ts';
  2   | import { CUSTOMER, PRODUCTS } from '../../test-data/products.ts';
  3   | 
  4   | /*
  5   |  * Each test asserts the CORRECT behaviour (as standard_user gets it) and is marked
  6   |  * test.fail() because problem_user currently violates it. When a bug is fixed the
  7   |  * test passes unexpectedly, Playwright flags it, and the test.fail() line is removed.
  8   |  *
  9   |  * Tags: @BUG-xxx, @sev-<severity>, @P<priority>. Run one slice with e.g. --grep @P1.
  10  |  */
  11  | 
  12  | const bug = (id: string, file: string) => ({ type: 'issue', description: `bugs/${id}-${file}.md` });
  13  | 
  14  | test.describe('Known defects – problem_user', () => {
  15  |   test.beforeEach(async ({ inventoryPage }) => {
  16  |     await inventoryPage.goto();
  17  |   });
  18  | 
  19  |   test('BUG-001 checkout keeps the Last Name that was typed',
  20  |     { tag: ['@BUG-001', '@sev-high', '@P1'], annotation: bug('BUG-001', 'checkout-last-name-overwrites-first-name') },
  21  |     async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  22  |       test.fail();
  23  |       await inventoryPage.addToCart(PRODUCTS[0].name);
  24  |       await inventoryPage.openCart();
  25  |       await cartPage.checkout();
  26  |       await checkoutPage.typeInformation(CUSTOMER);
  27  |       await test.info().attach('checkout-form-after-typing', { body: await page.screenshot(), contentType: 'image/png' });
  28  | 
  29  |       await expect(checkoutPage.firstName).toHaveValue(CUSTOMER.firstName);
  30  |       await expect(checkoutPage.lastName).toHaveValue(CUSTOMER.lastName);
  31  |       await checkoutPage.continue();
  32  |       await expect(page).toHaveURL('/checkout-step-two.html');
  33  |     });
  34  | 
  35  |   test('BUG-002 every product can be added to the cart',
  36  |     { tag: ['@BUG-002', '@sev-high', '@P2'], annotation: bug('BUG-002', 'add-to-cart-fails-for-three-products') },
  37  |     async ({ page, inventoryPage }) => {
  38  |       test.fail();
  39  |       for (const product of PRODUCTS) await inventoryPage.addToCart(product.name);
  40  |       await test.info().attach('inventory-after-adding-all-six', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  41  | 
  42  |       for (const product of PRODUCTS) {
  43  |         await expect.soft(inventoryPage.removeButton(product.name), `${product.name} should be in the cart`).toBeVisible();
  44  |       }
  45  |       await expect(inventoryPage.cartBadge).toHaveText(String(PRODUCTS.length));
  46  |     });
  47  | 
  48  |   test('BUG-003 an added product can be removed from the inventory page',
  49  |     { tag: ['@BUG-003', '@sev-high', '@P2'], annotation: bug('BUG-003', 'remove-from-cart-does-nothing-on-inventory') },
  50  |     async ({ page, inventoryPage }) => {
  51  |       test.fail();
  52  |       const { name } = PRODUCTS[0];
  53  |       await inventoryPage.addToCart(name);
  54  |       await expect(inventoryPage.cartBadge).toHaveText('1');
  55  |       await inventoryPage.remove(name);
  56  |       await test.info().attach('inventory-after-remove-click', { body: await page.screenshot(), contentType: 'image/png' });
  57  | 
  58  |       await expect(inventoryPage.addToCartButton(name)).toBeVisible();
  59  |       await expect(inventoryPage.cartBadge).toBeHidden();
  60  |     });
  61  | 
  62  |   test('BUG-003 workaround: Remove works from the Cart page',
  63  |     { tag: ['@workaround'], annotation: { type: 'issue', description: 'bugs/BUG-003-remove-from-cart-does-nothing-on-inventory.md' } },
  64  |     async ({ inventoryPage, cartPage }) => {
  65  |       const { name } = PRODUCTS[0];
  66  |       await inventoryPage.addToCart(name);
  67  |       await inventoryPage.openCart();
  68  |       await expect(cartPage.itemNames).toHaveText([name]);
  69  |       await cartPage.remove(name);
  70  |       await expect(cartPage.items).toHaveCount(0);
  71  |       await expect(inventoryPage.cartBadge).toBeHidden();
  72  |     });
  73  | 
  74  |   test('BUG-004 product link opens the product that was clicked',
  75  |     { tag: ['@BUG-004', '@sev-high', '@P2'], annotation: bug('BUG-004', 'product-link-opens-wrong-product') },
  76  |     async ({ page, inventoryPage, productPage }) => {
  77  |       test.fail();
  78  |       const product = PRODUCTS[0];
  79  |       await inventoryPage.openProduct(product.name);
  80  |       await expect(productPage.backButton).toBeVisible();
  81  |       await test.info().attach('product-page-after-clicking-backpack', { body: await page.screenshot(), contentType: 'image/png' });
  82  | 
> 83  |       await expect(page).toHaveURL(`/inventory-item.html?id=${product.id}`);
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  84  |       await expect(productPage.name).toHaveText(product.name);
  85  |     });
  86  | 
  87  |   test('BUG-005 sort Name (Z to A) reverses the list',
  88  |     { tag: ['@BUG-005', '@sev-medium', '@P3'], annotation: bug('BUG-005', 'product-sort-has-no-effect') },
  89  |     async ({ page, inventoryPage }) => {
  90  |       test.fail();
  91  |       await inventoryPage.sortBy('za');
  92  |       await test.info().attach('inventory-after-sort-za', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  93  | 
  94  |       await expect(inventoryPage.itemNames).toHaveText(PRODUCTS.map(p => p.name).sort().reverse());
  95  |     });
  96  | 
  97  |   test('BUG-006 every product shows its own image',
  98  |     { tag: ['@BUG-006', '@sev-medium', '@P2'], annotation: bug('BUG-006', 'all-product-images-show-placeholder') },
  99  |     async ({ page, inventoryPage }) => {
  100 |       test.fail();
  101 |       await test.info().attach('inventory-images', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  102 |       const sources = await inventoryPage.itemImages.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
  103 |       await test.info().attach('image-src-values', { body: JSON.stringify(sources, null, 2), contentType: 'application/json' });
  104 | 
  105 |       expect(new Set(sources).size).toBe(PRODUCTS.length);
  106 |       for (const src of sources) expect(src).not.toContain('sl-404');
  107 |     });
  108 | });
  109 | 
  110 | test.describe('Known defects – problem_user product page', () => {
  111 |   test('BUG-007 Fleece Jacket opens its own product page and adds a real item',
  112 |     { tag: ['@BUG-007', '@sev-high', '@P2'], annotation: bug('BUG-007', 'fleece-jacket-opens-item-not-found') },
  113 |     async ({ page, inventoryPage, productPage, cartPage }) => {
  114 |       test.fail();
  115 |       const product = PRODUCTS.find(p => p.name === 'Sauce Labs Fleece Jacket')!;
  116 |       await inventoryPage.goto();
  117 |       await inventoryPage.openProduct(product.name);
  118 |       await expect(productPage.backButton).toBeVisible();
  119 |       await test.info().attach('product-page-after-clicking-fleece-jacket', { body: await page.screenshot(), contentType: 'image/png' });
  120 | 
  121 |       await expect.soft(productPage.name).toHaveText(product.name);
  122 |       await expect.soft(productPage.price).toHaveText(product.price);
  123 | 
  124 |       await page.getByRole('button', { name: 'Add to cart' }).click();
  125 |       await expect(inventoryPage.cartBadge).toHaveText('1');
  126 |       await cartPage.goto();
  127 |       await test.info().attach('cart-after-adding-from-that-page', { body: await page.screenshot(), contentType: 'image/png' });
  128 |       await expect(cartPage.itemNames, 'cart should list the item the badge counts').toHaveText([product.name]);
  129 |     });
  130 | });
  131 | 
```