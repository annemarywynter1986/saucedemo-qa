import { test, expect } from '../../fixtures/test.ts';
import { PRODUCTS } from '../../test-data/products.ts';

test.describe('Inventory – standard_user', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('every product shows its own image', async ({ inventoryPage }) => {
    const sources = await inventoryPage.itemImages.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
    expect(new Set(sources).size).toBe(PRODUCTS.length);
    for (const src of sources) expect(src).not.toContain('sl-404');
  });

  test('sort Name (Z to A) reverses the list', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    await expect(inventoryPage.itemNames).toHaveText(PRODUCTS.map(p => p.name).sort().reverse());
  });

  test('sort Price (low to high) orders by price', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const expected = [...PRODUCTS].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    await expect(inventoryPage.itemPrices).toHaveText(expected.map(p => p.price));
  });

  for (const product of PRODUCTS) {
    test(`product link opens ${product.name}`, async ({ page, inventoryPage, productPage }) => {
      await inventoryPage.openProduct(product.name);
      await expect(productPage.backButton).toBeVisible();
      await expect(page).toHaveURL(`/inventory-item.html?id=${product.id}`);
      await expect(productPage.name).toHaveText(product.name);
      await expect(productPage.price).toHaveText(product.price);
    });
  }
});
