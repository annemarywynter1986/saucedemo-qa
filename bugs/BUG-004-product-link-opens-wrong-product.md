# BUG-004 — Clicking a product name opens a different product's detail page

| Field | Value |
|---|---|
| Severity | **High** |
| Priority | **P2 – next sprint** |
| Component | Inventory › Product detail navigation |
| Labels | navigation, product-detail, data-integrity |
| Related | BUG-007 |
| Environment | https://www.saucedemo.com · Chromium 159 (Playwright 1.65.1, Desktop Chrome 1280×720) · macOS 26.2 |
| Account | `problem_user` / `secret_sauce` (control: `standard_user` behaves correctly) |
| Reported | 2026-11-16 · Anne Mary Wynter |
| Status | Open |

## Summary
Clicking a product name on the Products page navigates to the detail page of a different product. Clicking *Sauce Labs Backpack* (id 4) opens id 5, *Sauce Labs Fleece Jacket*.

## Steps to reproduce
1. Log in as `problem_user`.
2. On Products, click the name **Sauce Labs Backpack**.

## Expected
URL `/inventory-item.html?id=4`; page shows *Sauce Labs Backpack*, $29.99.

## Actual
URL `/inventory-item.html?id=5`; page shows *Sauce Labs Fleece Jacket*.

Every link points to the wrong product (observed during exploration):

| Clicked | Opens (id) | Page shows |
|---|---|---|
| Sauce Labs Backpack | 5 | Sauce Labs Fleece Jacket, $49.99 |
| Sauce Labs Bike Light | 1 | Sauce Labs Bolt T-Shirt, $15.99 |
| Sauce Labs Bolt T-Shirt | 2 | Sauce Labs Onesie, $7.99 |
| Sauce Labs Fleece Jacket | 6 | ITEM NOT FOUND, $√-1 — logged separately as BUG-007 |
| Sauce Labs Onesie | 3 | Test.allTheThings() T-Shirt (Red), $15.99 |
| Test.allTheThings() T-Shirt (Red) | 4 | Sauce Labs Backpack, $29.99 |

The title, description, image and price on each opened page are consistent with each other; they belong to the wrong product.

## Impact
Users see the wrong product's description and price, and *Add to cart* on that page adds the wrong item. Risk of wrong orders and customer complaints.

## Evidence
- Screenshot after clicking Backpack: [product-page-after-clicking-backpack.png](evidence/BUG-004/product-page-after-clicking-backpack.png)
- Video: [video.webm](evidence/BUG-004/video.webm) · Trace: [trace.zip](evidence/BUG-004/trace.zip)
- Assertion output: [assertion-failures.txt](evidence/BUG-004/assertion-failures.txt) — `Expected: …?id=4`, `Received: …?id=5`

## Automated test
`tests/problem-user/known-defects.spec.ts` › *BUG-004 product link opens the product that was clicked* (`@BUG-004 @sev-high @P2`)
