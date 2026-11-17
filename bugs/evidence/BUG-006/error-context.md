# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: problem-user/known-defects.spec.ts >> Known defects – problem_user >> BUG-006 every product shows its own image
- Location: tests/problem-user/known-defects.spec.ts:97:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6
Received: 1
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic [ref=f1e4]:
    - banner [ref=f1e5]:
      - generic [ref=f1e6]:
        - generic:
          - generic:
            - generic [ref=f1e7]:
              - button "Open Menu" [ref=f1e8] [cursor=pointer]
              - img "Open Menu" [ref=f1e9]
            - generic [aria-hidden] [ref=f1e10]:
              - navigation [ref=f1e12]:
                - button [ref=f1e13] [cursor=pointer]: All Items
                - button [ref=f1e14] [cursor=pointer]: Dynamic Catalog
                - link [ref=f1e16] [cursor=pointer]:
                  - /url: https://saucelabs.com/error/404
                  - text: About
                - button [ref=f1e17] [cursor=pointer]: Logout
                - button [ref=f1e18] [cursor=pointer]: Reset App State
              - button [ref=f1e20] [cursor=pointer]: Close Menu
        - generic [ref=f1e22]: Swag Labs
        - button "Cart, empty" [ref=f1e25]
      - generic [ref=f1e26]:
        - generic [ref=f1e27]: Products
        - generic [ref=f1e29] [cursor=pointer]:
          - generic [ref=f1e30]: Name (A to Z)
          - combobox "Sort products" [ref=f1e31]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - main [ref=f1e32]:
      - generic [ref=f1e35]:
        - generic [ref=f1e36]:
          - button "View details for Sauce Labs Backpack" [ref=f1e38] [cursor=pointer]:
            - img "Sauce Labs Backpack" [ref=f1e39]
          - generic [ref=f1e40]:
            - generic [ref=f1e41]:
              - button "View details for Sauce Labs Backpack" [ref=f1e42] [cursor=pointer]:
                - generic [ref=f1e43]: Sauce Labs Backpack
              - generic [ref=f1e44]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=f1e45]:
              - generic [ref=f1e46]: $29.99
              - button "Add to cart" [ref=f1e47] [cursor=pointer]
        - generic [ref=f1e48]:
          - button "View details for Sauce Labs Bike Light" [ref=f1e50] [cursor=pointer]:
            - img "Sauce Labs Bike Light" [ref=f1e51]
          - generic [ref=f1e52]:
            - generic [ref=f1e53]:
              - button "View details for Sauce Labs Bike Light" [ref=f1e54] [cursor=pointer]:
                - generic [ref=f1e55]: Sauce Labs Bike Light
              - generic [ref=f1e56]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=f1e57]:
              - generic [ref=f1e58]: $9.99
              - button "Add to cart" [ref=f1e59] [cursor=pointer]
        - generic [ref=f1e60]:
          - button "View details for Sauce Labs Bolt T-Shirt" [ref=f1e62] [cursor=pointer]:
            - img "Sauce Labs Bolt T-Shirt" [ref=f1e63]
          - generic [ref=f1e64]:
            - generic [ref=f1e65]:
              - button "View details for Sauce Labs Bolt T-Shirt" [ref=f1e66] [cursor=pointer]:
                - generic [ref=f1e67]: Sauce Labs Bolt T-Shirt
              - generic [ref=f1e68]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=f1e69]:
              - generic [ref=f1e70]: $15.99
              - button "Add to cart" [ref=f1e71] [cursor=pointer]
        - generic [ref=f1e72]:
          - button "View details for Sauce Labs Fleece Jacket" [ref=f1e74] [cursor=pointer]:
            - img "Sauce Labs Fleece Jacket" [ref=f1e75]
          - generic [ref=f1e76]:
            - generic [ref=f1e77]:
              - button "View details for Sauce Labs Fleece Jacket" [ref=f1e78] [cursor=pointer]:
                - generic [ref=f1e79]: Sauce Labs Fleece Jacket
              - generic [ref=f1e80]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
            - generic [ref=f1e81]:
              - generic [ref=f1e82]: $49.99
              - button "Add to cart" [ref=f1e83] [cursor=pointer]
        - generic [ref=f1e84]:
          - button "View details for Sauce Labs Onesie" [ref=f1e86] [cursor=pointer]:
            - img "Sauce Labs Onesie" [ref=f1e87]
          - generic [ref=f1e88]:
            - generic [ref=f1e89]:
              - button "View details for Sauce Labs Onesie" [ref=f1e90] [cursor=pointer]:
                - generic [ref=f1e91]: Sauce Labs Onesie
              - generic [ref=f1e92]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
            - generic [ref=f1e93]:
              - generic [ref=f1e94]: $7.99
              - button "Add to cart" [ref=f1e95] [cursor=pointer]
        - generic [ref=f1e96]:
          - button "View details for Test.allTheThings() T-Shirt (Red)" [ref=f1e98] [cursor=pointer]:
            - img "Test.allTheThings() T-Shirt (Red)" [ref=f1e99]
          - generic [ref=f1e100]:
            - generic [ref=f1e101]:
              - button "View details for Test.allTheThings() T-Shirt (Red)" [ref=f1e102] [cursor=pointer]:
                - generic [ref=f1e103]: Test.allTheThings() T-Shirt (Red)
              - generic [ref=f1e104]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
            - generic [ref=f1e105]:
              - generic [ref=f1e106]: $15.99
              - button "Add to cart" [ref=f1e107] [cursor=pointer]
  - contentinfo [ref=f1e108]:
    - list [ref=f1e109]:
      - listitem [ref=f1e110]:
        - link "X" [ref=f1e111] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=f1e112]:
        - link "Facebook" [ref=f1e113] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=f1e114]:
        - link "LinkedIn" [ref=f1e115] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=f1e116]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
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
  83  |       await expect(page).toHaveURL(`/inventory-item.html?id=${product.id}`);
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
> 105 |       expect(new Set(sources).size).toBe(PRODUCTS.length);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
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