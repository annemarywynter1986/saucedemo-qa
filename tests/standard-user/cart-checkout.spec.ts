import { test, expect } from '../../fixtures/test.ts';
import { CUSTOMER, PRODUCTS } from '../../test-data/products.ts';

test.describe('Cart and checkout – standard_user', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('every product can be added to the cart', async ({ inventoryPage }) => {
    for (const [i, product] of PRODUCTS.entries()) {
      await inventoryPage.addToCart(product.name);
      await expect(inventoryPage.removeButton(product.name)).toBeVisible();
      await expect(inventoryPage.cartBadge).toHaveText(String(i + 1));
    }
  });

  test('an added product can be removed from the inventory page', async ({ inventoryPage }) => {
    const { name } = PRODUCTS[0];
    await inventoryPage.addToCart(name);
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.remove(name);
    await expect(inventoryPage.addToCartButton(name)).toBeVisible();
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('checkout completes end to end', { tag: '@smoke' }, async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart(PRODUCTS[0].name);
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText([PRODUCTS[0].name]);
    await cartPage.checkout();

    await checkoutPage.fillInformation(CUSTOMER);
    await expect(checkoutPage.firstName).toHaveValue(CUSTOMER.firstName);
    await expect(checkoutPage.lastName).toHaveValue(CUSTOMER.lastName);
    await checkoutPage.continue();

    await expect(page).toHaveURL('/checkout-step-two.html');
    await expect(checkoutPage.summaryTotal).toHaveText('Total: $32.39');
    await checkoutPage.finish();

    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
