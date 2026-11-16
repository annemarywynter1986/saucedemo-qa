# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: problem-user/known-defects.spec.ts >> Known defects – problem_user >> BUG-002 every product can be added to the cart
- Location: tests/problem-user/known-defects.spec.ts:35:3

# Error details

```
Error: Sauce Labs Bolt T-Shirt should be in the cart

expect(locator).toBeVisible() failed

Locator: getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Sauce Labs Bolt T-Shirt', { exact: true }) }).getByRole('button', { name: 'Remove' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Sauce Labs Bolt T-Shirt should be in the cart getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Sauce Labs Bolt T-Shirt', { exact: true }) }).getByRole('button', { name: 'Remove' }) with timeout 5000ms
  - waiting for getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Sauce Labs Bolt T-Shirt', { exact: true }) }).getByRole('button', { name: 'Remove' })

```

```yaml
- banner:
  - button "Open Menu"
  - img "Open Menu"
  - text: Swag Labs
  - button "Cart, 3 items": "3"
  - text: Products Name (A to Z)
  - combobox "Sort products":
    - option "Name (A to Z)" [selected]
    - option "Name (Z to A)"
    - option "Price (low to high)"
    - option "Price (high to low)"
- main:
  - button "View details for Sauce Labs Backpack":
    - img "Sauce Labs Backpack"
  - button "View details for Sauce Labs Backpack": Sauce Labs Backpack
  - text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
  - button "Remove"
  - button "View details for Sauce Labs Bike Light":
    - img "Sauce Labs Bike Light"
  - button "View details for Sauce Labs Bike Light": Sauce Labs Bike Light
  - text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
  - button "Remove"
  - button "View details for Sauce Labs Bolt T-Shirt":
    - img "Sauce Labs Bolt T-Shirt"
  - button "View details for Sauce Labs Bolt T-Shirt": Sauce Labs Bolt T-Shirt
  - text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
  - button "Add to cart"
  - button "View details for Sauce Labs Fleece Jacket":
    - img "Sauce Labs Fleece Jacket"
  - button "View details for Sauce Labs Fleece Jacket": Sauce Labs Fleece Jacket
  - text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
  - button "Add to cart"
  - button "View details for Sauce Labs Onesie":
    - img "Sauce Labs Onesie"
  - button "View details for Sauce Labs Onesie": Sauce Labs Onesie
  - text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
  - button "Remove"
  - button "View details for Test.allTheThings() T-Shirt (Red)":
    - img "Test.allTheThings() T-Shirt (Red)"
  - button "View details for Test.allTheThings() T-Shirt (Red)": Test.allTheThings() T-Shirt (Red)
  - text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
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

```
Error: Sauce Labs Fleece Jacket should be in the cart

expect(locator).toBeVisible() failed

Locator: getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Sauce Labs Fleece Jacket', { exact: true }) }).getByRole('button', { name: 'Remove' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Sauce Labs Fleece Jacket should be in the cart getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Sauce Labs Fleece Jacket', { exact: true }) }).getByRole('button', { name: 'Remove' }) with timeout 5000ms
  - waiting for getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Sauce Labs Fleece Jacket', { exact: true }) }).getByRole('button', { name: 'Remove' })

```

```yaml
- banner:
  - button "Open Menu"
  - img "Open Menu"
  - text: Swag Labs
  - button "Cart, 3 items": "3"
  - text: Products Name (A to Z)
  - combobox "Sort products":
    - option "Name (A to Z)" [selected]
    - option "Name (Z to A)"
    - option "Price (low to high)"
    - option "Price (high to low)"
- main:
  - button "View details for Sauce Labs Backpack":
    - img "Sauce Labs Backpack"
  - button "View details for Sauce Labs Backpack": Sauce Labs Backpack
  - text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
  - button "Remove"
  - button "View details for Sauce Labs Bike Light":
    - img "Sauce Labs Bike Light"
  - button "View details for Sauce Labs Bike Light": Sauce Labs Bike Light
  - text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
  - button "Remove"
  - button "View details for Sauce Labs Bolt T-Shirt":
    - img "Sauce Labs Bolt T-Shirt"
  - button "View details for Sauce Labs Bolt T-Shirt": Sauce Labs Bolt T-Shirt
  - text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
  - button "Add to cart"
  - button "View details for Sauce Labs Fleece Jacket":
    - img "Sauce Labs Fleece Jacket"
  - button "View details for Sauce Labs Fleece Jacket": Sauce Labs Fleece Jacket
  - text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
  - button "Add to cart"
  - button "View details for Sauce Labs Onesie":
    - img "Sauce Labs Onesie"
  - button "View details for Sauce Labs Onesie": Sauce Labs Onesie
  - text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
  - button "Remove"
  - button "View details for Test.allTheThings() T-Shirt (Red)":
    - img "Test.allTheThings() T-Shirt (Red)"
  - button "View details for Test.allTheThings() T-Shirt (Red)": Test.allTheThings() T-Shirt (Red)
  - text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
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

```
Error: Test.allTheThings() T-Shirt (Red) should be in the cart

expect(locator).toBeVisible() failed

Locator: getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Test.allTheThings() T-Shirt (Red)', { exact: true }) }).getByRole('button', { name: 'Remove' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Test.allTheThings() T-Shirt (Red) should be in the cart getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Test.allTheThings() T-Shirt (Red)', { exact: true }) }).getByRole('button', { name: 'Remove' }) with timeout 5000ms
  - waiting for getByTestId('inventory-item').filter({ has: getByTestId('inventory-item-name').getByText('Test.allTheThings() T-Shirt (Red)', { exact: true }) }).getByRole('button', { name: 'Remove' })

```

```yaml
- banner:
  - button "Open Menu"
  - img "Open Menu"
  - text: Swag Labs
  - button "Cart, 3 items": "3"
  - text: Products Name (A to Z)
  - combobox "Sort products":
    - option "Name (A to Z)" [selected]
    - option "Name (Z to A)"
    - option "Price (low to high)"
    - option "Price (high to low)"
- main:
  - button "View details for Sauce Labs Backpack":
    - img "Sauce Labs Backpack"
  - button "View details for Sauce Labs Backpack": Sauce Labs Backpack
  - text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
  - button "Remove"
  - button "View details for Sauce Labs Bike Light":
    - img "Sauce Labs Bike Light"
  - button "View details for Sauce Labs Bike Light": Sauce Labs Bike Light
  - text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
  - button "Remove"
  - button "View details for Sauce Labs Bolt T-Shirt":
    - img "Sauce Labs Bolt T-Shirt"
  - button "View details for Sauce Labs Bolt T-Shirt": Sauce Labs Bolt T-Shirt
  - text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
  - button "Add to cart"
  - button "View details for Sauce Labs Fleece Jacket":
    - img "Sauce Labs Fleece Jacket"
  - button "View details for Sauce Labs Fleece Jacket": Sauce Labs Fleece Jacket
  - text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
  - button "Add to cart"
  - button "View details for Sauce Labs Onesie":
    - img "Sauce Labs Onesie"
  - button "View details for Sauce Labs Onesie": Sauce Labs Onesie
  - text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
  - button "Remove"
  - button "View details for Test.allTheThings() T-Shirt (Red)":
    - img "Test.allTheThings() T-Shirt (Red)"
  - button "View details for Test.allTheThings() T-Shirt (Red)": Test.allTheThings() T-Shirt (Red)
  - text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
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

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('shopping-cart-badge')
Expected: "6"
Received: "3"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" getByTestId('shopping-cart-badge') with timeout 5000ms
  - waiting for getByTestId('shopping-cart-badge')
    14 × locator resolved to <span class="shopping_cart_badge" data-test="shopping-cart-badge">3</span>
       - unexpected value "3"

```

```yaml
- text: "3"
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/test.ts';
  2  | import { CUSTOMER, PRODUCTS } from '../../test-data/products.ts';
  3  | 
  4  | /*
  5  |  * Each test asserts the CORRECT behaviour (as standard_user gets it) and is marked
  6  |  * test.fail() because problem_user currently violates it. When a bug is fixed the
  7  |  * test passes unexpectedly, Playwright flags it, and the test.fail() line is removed.
  8  |  *
  9  |  * Tags: @BUG-xxx, @sev-<severity>, @P<priority>. Run one slice with e.g. --grep @P1.
  10 |  */
  11 | 
  12 | const bug = (id: string, file: string) => ({ type: 'issue', description: `bugs/${id}-${file}.md` });
  13 | 
  14 | test.describe('Known defects – problem_user', () => {
  15 |   test.beforeEach(async ({ inventoryPage }) => {
  16 |     await inventoryPage.goto();
  17 |   });
  18 | 
  19 |   test('BUG-001 checkout keeps the Last Name that was typed',
  20 |     { tag: ['@BUG-001', '@sev-critical', '@P1'], annotation: bug('BUG-001', 'checkout-last-name-overwrites-first-name') },
  21 |     async ({ page, inventoryPage, cartPage, checkoutPage }) => {
  22 |       test.fail();
  23 |       await inventoryPage.addToCart(PRODUCTS[0].name);
  24 |       await inventoryPage.openCart();
  25 |       await cartPage.checkout();
  26 |       await checkoutPage.fillInformation(CUSTOMER);
  27 |       await test.info().attach('checkout-form-after-typing', { body: await page.screenshot(), contentType: 'image/png' });
  28 | 
  29 |       await expect(checkoutPage.firstName).toHaveValue(CUSTOMER.firstName);
  30 |       await expect(checkoutPage.lastName).toHaveValue(CUSTOMER.lastName);
  31 |       await checkoutPage.continue();
  32 |       await expect(page).toHaveURL('/checkout-step-two.html');
  33 |     });
  34 | 
  35 |   test('BUG-002 every product can be added to the cart',
  36 |     { tag: ['@BUG-002', '@sev-high', '@P1'], annotation: bug('BUG-002', 'add-to-cart-fails-for-three-products') },
  37 |     async ({ page, inventoryPage }) => {
  38 |       test.fail();
  39 |       for (const product of PRODUCTS) await inventoryPage.addToCart(product.name);
  40 |       await test.info().attach('inventory-after-adding-all-six', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  41 | 
  42 |       for (const product of PRODUCTS) {
  43 |         await expect.soft(inventoryPage.removeButton(product.name), `${product.name} should be in the cart`).toBeVisible();
  44 |       }
> 45 |       await expect(inventoryPage.cartBadge).toHaveText(String(PRODUCTS.length));
     |                                             ^ Error: expect(locator).toHaveText(expected) failed
  46 |     });
  47 | 
  48 |   test('BUG-003 an added product can be removed from the inventory page',
  49 |     { tag: ['@BUG-003', '@sev-high', '@P2'], annotation: bug('BUG-003', 'remove-from-cart-does-nothing-on-inventory') },
  50 |     async ({ page, inventoryPage }) => {
  51 |       test.fail();
  52 |       const { name } = PRODUCTS[0];
  53 |       await inventoryPage.addToCart(name);
  54 |       await expect(inventoryPage.cartBadge).toHaveText('1');
  55 |       await inventoryPage.remove(name);
  56 |       await test.info().attach('inventory-after-remove-click', { body: await page.screenshot(), contentType: 'image/png' });
  57 | 
  58 |       await expect(inventoryPage.addToCartButton(name)).toBeVisible();
  59 |       await expect(inventoryPage.cartBadge).toBeHidden();
  60 |     });
  61 | 
  62 |   test('BUG-004 product link opens the product that was clicked',
  63 |     { tag: ['@BUG-004', '@sev-high', '@P2'], annotation: bug('BUG-004', 'product-link-opens-wrong-product') },
  64 |     async ({ page, inventoryPage, productPage }) => {
  65 |       test.fail();
  66 |       const product = PRODUCTS[0];
  67 |       await inventoryPage.openProduct(product.name);
  68 |       await expect(productPage.backButton).toBeVisible();
  69 |       await test.info().attach('product-page-after-clicking-backpack', { body: await page.screenshot(), contentType: 'image/png' });
  70 | 
  71 |       await expect(page).toHaveURL(`/inventory-item.html?id=${product.id}`);
  72 |       await expect(productPage.name).toHaveText(product.name);
  73 |     });
  74 | 
  75 |   test('BUG-005 sort Name (Z to A) reverses the list',
  76 |     { tag: ['@BUG-005', '@sev-medium', '@P3'], annotation: bug('BUG-005', 'product-sort-has-no-effect') },
  77 |     async ({ page, inventoryPage }) => {
  78 |       test.fail();
  79 |       await inventoryPage.sortBy('za');
  80 |       await test.info().attach('inventory-after-sort-za', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  81 | 
  82 |       await expect(inventoryPage.itemNames).toHaveText(PRODUCTS.map(p => p.name).sort().reverse());
  83 |     });
  84 | 
  85 |   test('BUG-006 every product shows its own image',
  86 |     { tag: ['@BUG-006', '@sev-medium', '@P2'], annotation: bug('BUG-006', 'all-product-images-show-placeholder') },
  87 |     async ({ page, inventoryPage }) => {
  88 |       test.fail();
  89 |       await test.info().attach('inventory-images', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  90 |       const sources = await inventoryPage.itemImages.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
  91 |       await test.info().attach('image-src-values', { body: JSON.stringify(sources, null, 2), contentType: 'application/json' });
  92 | 
  93 |       expect(new Set(sources).size).toBe(PRODUCTS.length);
  94 |       for (const src of sources) expect(src).not.toContain('sl-404');
  95 |     });
  96 | });
  97 | 
```