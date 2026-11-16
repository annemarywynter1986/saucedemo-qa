# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: problem-user/known-defects.spec.ts >> Known defects – problem_user product page >> BUG-007 Fleece Jacket opens its own product page and adds a real item
- Location: tests/problem-user/known-defects.spec.ts:99:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('inventory-item-name')
Expected: "Sauce Labs Fleece Jacket"
Received: "ITEM NOT FOUND"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" getByTestId('inventory-item-name') with timeout 5000ms
  - waiting for getByTestId('inventory-item-name')
    14 × locator resolved to <div data-test="inventory-item-name" class="inventory_details_name large_size">ITEM NOT FOUND</div>
       - unexpected value "ITEM NOT FOUND"

```

```yaml
- text: ITEM NOT FOUND
```

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('inventory-item-price')
Expected: "$49.99"
Received: "$√-1"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" getByTestId('inventory-item-price') with timeout 5000ms
  - waiting for getByTestId('inventory-item-price')
    14 × locator resolved to <div class="inventory_details_price" data-test="inventory-item-price">$√-1</div>
       - unexpected value "$√-1"

```

```yaml
- text: $√-1
```

```
Error: cart should list the item the badge counts

expect(locator).toHaveText(expected) failed

Locator: getByTestId('inventory-item-name')
Timeout: 5000ms
- Expected  - 3
+ Received  + 1

- Array [
-   "Sauce Labs Fleece Jacket",
- ]
+ Array []

Call log:
  - cart should list the item the badge counts getByTestId('inventory-item-name') with timeout 5000ms
  - waiting for getByTestId('inventory-item-name')
    14 × locator resolved to 0 elements

```

# Test source

```ts
  16  |     await inventoryPage.goto();
  17  |   });
  18  | 
  19  |   test('BUG-001 checkout keeps the Last Name that was typed',
  20  |     { tag: ['@BUG-001', '@sev-critical', '@P1'], annotation: bug('BUG-001', 'checkout-last-name-overwrites-first-name') },
  21  |     async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  22  |       test.fail();
  23  |       await inventoryPage.addToCart(PRODUCTS[0].name);
  24  |       await inventoryPage.openCart();
  25  |       await cartPage.checkout();
  26  |       await checkoutPage.fillInformation(CUSTOMER);
  27  |       await test.info().attach('checkout-form-after-typing', { body: await page.screenshot(), contentType: 'image/png' });
  28  | 
  29  |       await expect(checkoutPage.firstName).toHaveValue(CUSTOMER.firstName);
  30  |       await expect(checkoutPage.lastName).toHaveValue(CUSTOMER.lastName);
  31  |       await checkoutPage.continue();
  32  |       await expect(page).toHaveURL('/checkout-step-two.html');
  33  |     });
  34  | 
  35  |   test('BUG-002 every product can be added to the cart',
  36  |     { tag: ['@BUG-002', '@sev-high', '@P1'], annotation: bug('BUG-002', 'add-to-cart-fails-for-three-products') },
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
  62  |   test('BUG-004 product link opens the product that was clicked',
  63  |     { tag: ['@BUG-004', '@sev-high', '@P2'], annotation: bug('BUG-004', 'product-link-opens-wrong-product') },
  64  |     async ({ page, inventoryPage, productPage }) => {
  65  |       test.fail();
  66  |       const product = PRODUCTS[0];
  67  |       await inventoryPage.openProduct(product.name);
  68  |       await expect(productPage.backButton).toBeVisible();
  69  |       await test.info().attach('product-page-after-clicking-backpack', { body: await page.screenshot(), contentType: 'image/png' });
  70  | 
  71  |       await expect(page).toHaveURL(`/inventory-item.html?id=${product.id}`);
  72  |       await expect(productPage.name).toHaveText(product.name);
  73  |     });
  74  | 
  75  |   test('BUG-005 sort Name (Z to A) reverses the list',
  76  |     { tag: ['@BUG-005', '@sev-medium', '@P3'], annotation: bug('BUG-005', 'product-sort-has-no-effect') },
  77  |     async ({ page, inventoryPage }) => {
  78  |       test.fail();
  79  |       await inventoryPage.sortBy('za');
  80  |       await test.info().attach('inventory-after-sort-za', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  81  | 
  82  |       await expect(inventoryPage.itemNames).toHaveText(PRODUCTS.map(p => p.name).sort().reverse());
  83  |     });
  84  | 
  85  |   test('BUG-006 every product shows its own image',
  86  |     { tag: ['@BUG-006', '@sev-medium', '@P2'], annotation: bug('BUG-006', 'all-product-images-show-placeholder') },
  87  |     async ({ page, inventoryPage }) => {
  88  |       test.fail();
  89  |       await test.info().attach('inventory-images', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  90  |       const sources = await inventoryPage.itemImages.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
  91  |       await test.info().attach('image-src-values', { body: JSON.stringify(sources, null, 2), contentType: 'application/json' });
  92  | 
  93  |       expect(new Set(sources).size).toBe(PRODUCTS.length);
  94  |       for (const src of sources) expect(src).not.toContain('sl-404');
  95  |     });
  96  | });
  97  | 
  98  | test.describe('Known defects – problem_user product page', () => {
  99  |   test('BUG-007 Fleece Jacket opens its own product page and adds a real item',
  100 |     { tag: ['@BUG-007', '@sev-high', '@P2'], annotation: bug('BUG-007', 'fleece-jacket-opens-item-not-found') },
  101 |     async ({ page, inventoryPage, productPage, cartPage }) => {
  102 |       test.fail();
  103 |       const product = PRODUCTS.find(p => p.name === 'Sauce Labs Fleece Jacket')!;
  104 |       await inventoryPage.goto();
  105 |       await inventoryPage.openProduct(product.name);
  106 |       await expect(productPage.backButton).toBeVisible();
  107 |       await test.info().attach('product-page-after-clicking-fleece-jacket', { body: await page.screenshot(), contentType: 'image/png' });
  108 | 
  109 |       await expect.soft(productPage.name).toHaveText(product.name);
  110 |       await expect.soft(productPage.price).toHaveText(product.price);
  111 | 
  112 |       await page.getByRole('button', { name: 'Add to cart' }).click();
  113 |       await expect(inventoryPage.cartBadge).toHaveText('1');
  114 |       await cartPage.goto();
  115 |       await test.info().attach('cart-after-adding-from-that-page', { body: await page.screenshot(), contentType: 'image/png' });
> 116 |       await expect(cartPage.itemNames, 'cart should list the item the badge counts').toHaveText([product.name]);
      |                                                                                      ^ Error: cart should list the item the badge counts
  117 |     });
  118 | });
  119 | 
```