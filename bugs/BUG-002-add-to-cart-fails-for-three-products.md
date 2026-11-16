# BUG-002 — Add to cart does nothing for 3 of 6 products

| Field | Value |
|---|---|
| Severity | **High** |
| Priority | **P1 – fix this sprint** |
| Component | Inventory › Add to cart |
| Labels | cart, inventory, revenue |
| Environment | https://www.saucedemo.com · Chromium 159 (Playwright 1.65.1, Desktop Chrome 1280×720) · macOS 26.2 |
| Account | `problem_user` / `secret_sauce` (control: `standard_user` behaves correctly) |
| Reported | 2026-11-16 · Anne Mary Wynter |
| Status | Open |

## Summary
On the Products page, **Add to cart** has no effect for *Sauce Labs Bolt T-Shirt*, *Sauce Labs Fleece Jacket* and *Test.allTheThings() T-Shirt (Red)*: the button does not change to Remove and the cart badge does not increase. The other three products add normally.

## Steps to reproduce
1. Log in as `problem_user`.
2. On Products, click **Add to cart** on all six products, top to bottom.
3. Look at each button and the cart badge.

## Expected
All six buttons change to **Remove**; cart badge shows **6**.

## Actual
Backpack, Bike Light and Onesie change to Remove. Bolt T-Shirt, Fleece Jacket and Test.allTheThings() T-Shirt (Red) still show Add to cart. Badge shows **3**.

## Also observed
The same three products cannot be added from their product pages either (Add to cart stays Add to cart, badge unchanged). Not yet automated.

## Impact
Half the catalog cannot be bought — including the highest-priced item (Fleece Jacket, $49.99). No workaround: adding from the product page fails too.

## Evidence
- Full-page screenshot after clicking all six: [inventory-after-adding-all-six.png](evidence/BUG-002/inventory-after-adding-all-six.png)
- Video: [video.webm](evidence/BUG-002/video.webm) · Trace: [trace.zip](evidence/BUG-002/trace.zip)
- Assertion output: [assertion-failures.txt](evidence/BUG-002/assertion-failures.txt) — one soft failure per broken product, then badge `Expected: "6"`, `Received: "3"`

## Automated test
`tests/problem-user/known-defects.spec.ts` › *BUG-002 every product can be added to the cart* (`@BUG-002 @sev-high @P1`)
