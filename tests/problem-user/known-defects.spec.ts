import { test, expect } from '../../fixtures/test.ts';
import { CUSTOMER, PRODUCTS } from '../../test-data/products.ts';

/*
 * Each test asserts the CORRECT behaviour (as standard_user gets it) and is marked
 * test.fail() because problem_user currently violates it. When a bug is fixed the
 * test passes unexpectedly, Playwright flags it, and the test.fail() line is removed.
 *
 * Tags: @BUG-xxx, @sev-<severity>, @P<priority>. Run one slice with e.g. --grep @P1.
 */

const bug = (id: string, file: string) => ({ type: 'issue', description: `bugs/${id}-${file}.md` });

test.describe('Known defects – problem_user', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('BUG-001 checkout keeps the Last Name that was typed',
    { tag: ['@BUG-001', '@sev-critical', '@P1'], annotation: bug('BUG-001', 'checkout-last-name-overwrites-first-name') },
    async ({ page, inventoryPage, cartPage, checkoutPage }) => {
      test.fail();
      await inventoryPage.addToCart(PRODUCTS[0].name);
      await inventoryPage.openCart();
      await cartPage.checkout();
      await checkoutPage.typeInformation(CUSTOMER);
      await test.info().attach('checkout-form-after-typing', { body: await page.screenshot(), contentType: 'image/png' });

      await expect(checkoutPage.firstName).toHaveValue(CUSTOMER.firstName);
      await expect(checkoutPage.lastName).toHaveValue(CUSTOMER.lastName);
      await checkoutPage.continue();
      await expect(page).toHaveURL('/checkout-step-two.html');
    });

  test('BUG-002 every product can be added to the cart',
    { tag: ['@BUG-002', '@sev-high', '@P2'], annotation: bug('BUG-002', 'add-to-cart-fails-for-three-products') },
    async ({ page, inventoryPage }) => {
      test.fail();
      for (const product of PRODUCTS) await inventoryPage.addToCart(product.name);
      await test.info().attach('inventory-after-adding-all-six', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });

      for (const product of PRODUCTS) {
        await expect.soft(inventoryPage.removeButton(product.name), `${product.name} should be in the cart`).toBeVisible();
      }
      await expect(inventoryPage.cartBadge).toHaveText(String(PRODUCTS.length));
    });

  test('BUG-003 an added product can be removed from the inventory page',
    { tag: ['@BUG-003', '@sev-high', '@P2'], annotation: bug('BUG-003', 'remove-from-cart-does-nothing-on-inventory') },
    async ({ page, inventoryPage }) => {
      test.fail();
      const { name } = PRODUCTS[0];
      await inventoryPage.addToCart(name);
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await inventoryPage.remove(name);
      await test.info().attach('inventory-after-remove-click', { body: await page.screenshot(), contentType: 'image/png' });

      await expect(inventoryPage.addToCartButton(name)).toBeVisible();
      await expect(inventoryPage.cartBadge).toBeHidden();
    });

  test('BUG-003 workaround: Remove works from the Cart page',
    { tag: ['@workaround'], annotation: { type: 'issue', description: 'bugs/BUG-003-remove-from-cart-does-nothing-on-inventory.md' } },
    async ({ inventoryPage, cartPage }) => {
      const { name } = PRODUCTS[0];
      await inventoryPage.addToCart(name);
      await inventoryPage.openCart();
      await expect(cartPage.itemNames).toHaveText([name]);
      await cartPage.remove(name);
      await expect(cartPage.items).toHaveCount(0);
      await expect(inventoryPage.cartBadge).toBeHidden();
    });

  test('BUG-004 product link opens the product that was clicked',
    { tag: ['@BUG-004', '@sev-high', '@P2'], annotation: bug('BUG-004', 'product-link-opens-wrong-product') },
    async ({ page, inventoryPage, productPage }) => {
      test.fail();
      const product = PRODUCTS[0];
      await inventoryPage.openProduct(product.name);
      await expect(productPage.backButton).toBeVisible();
      await test.info().attach('product-page-after-clicking-backpack', { body: await page.screenshot(), contentType: 'image/png' });

      await expect(page).toHaveURL(`/inventory-item.html?id=${product.id}`);
      await expect(productPage.name).toHaveText(product.name);
    });

  test('BUG-005 sort Name (Z to A) reverses the list',
    { tag: ['@BUG-005', '@sev-medium', '@P3'], annotation: bug('BUG-005', 'product-sort-has-no-effect') },
    async ({ page, inventoryPage }) => {
      test.fail();
      await inventoryPage.sortBy('za');
      await test.info().attach('inventory-after-sort-za', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });

      await expect(inventoryPage.itemNames).toHaveText(PRODUCTS.map(p => p.name).sort().reverse());
    });

  test('BUG-006 every product shows its own image',
    { tag: ['@BUG-006', '@sev-medium', '@P2'], annotation: bug('BUG-006', 'all-product-images-show-placeholder') },
    async ({ page, inventoryPage }) => {
      test.fail();
      await test.info().attach('inventory-images', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
      const sources = await inventoryPage.itemImages.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
      await test.info().attach('image-src-values', { body: JSON.stringify(sources, null, 2), contentType: 'application/json' });

      expect(new Set(sources).size).toBe(PRODUCTS.length);
      for (const src of sources) expect(src).not.toContain('sl-404');
    });
});

test.describe('Known defects – problem_user product page', () => {
  test('BUG-007 Fleece Jacket opens its own product page and adds a real item',
    { tag: ['@BUG-007', '@sev-high', '@P2'], annotation: bug('BUG-007', 'fleece-jacket-opens-item-not-found') },
    async ({ page, inventoryPage, productPage, cartPage }) => {
      test.fail();
      const product = PRODUCTS.find(p => p.name === 'Sauce Labs Fleece Jacket')!;
      await inventoryPage.goto();
      await inventoryPage.openProduct(product.name);
      await expect(productPage.backButton).toBeVisible();
      await test.info().attach('product-page-after-clicking-fleece-jacket', { body: await page.screenshot(), contentType: 'image/png' });

      await expect.soft(productPage.name).toHaveText(product.name);
      await expect.soft(productPage.price).toHaveText(product.price);

      await page.getByRole('button', { name: 'Add to cart' }).click();
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await cartPage.goto();
      await test.info().attach('cart-after-adding-from-that-page', { body: await page.screenshot(), contentType: 'image/png' });
      await expect(cartPage.itemNames, 'cart should list the item the badge counts').toHaveText([product.name]);
    });
});
