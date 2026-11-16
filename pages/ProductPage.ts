import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly name: Locator;
  readonly price: Locator;
  readonly backButton: Locator;

  constructor(readonly page: Page) {
    this.name = page.getByTestId('inventory-item-name');
    this.price = page.getByTestId('inventory-item-price');
    this.backButton = page.getByTestId('back-to-products');
  }
}
