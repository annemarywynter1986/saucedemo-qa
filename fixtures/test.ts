import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { InventoryPage } from '../pages/InventoryPage.ts';
import { ProductPage } from '../pages/ProductPage.ts';
import { CartPage } from '../pages/CartPage.ts';
import { CheckoutPage } from '../pages/CheckoutPage.ts';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

export { expect } from '@playwright/test';
