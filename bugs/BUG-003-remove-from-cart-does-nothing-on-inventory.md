# BUG-003 — Remove button on the Products page does not remove the item

| Field | Value |
|---|---|
| Severity | **High** |
| Priority | **P2 – next sprint** |
| Component | Inventory › Remove from cart |
| Labels | cart, inventory |
| Environment | https://www.saucedemo.com · Chromium 159 (Playwright 1.65.1, Desktop Chrome 1280×720) · macOS 26.2 |
| Account | `problem_user` / `secret_sauce` (control: `standard_user` behaves correctly) |
| Reported | 2026-11-16 · Anne Mary Wynter |
| Status | Open |

## Summary
After adding a product, clicking its **Remove** button on the Products page does nothing: the button stays *Remove* and the cart badge keeps its count.

## Steps to reproduce
1. Log in as `problem_user`.
2. Click **Add to cart** on *Sauce Labs Backpack* — badge shows 1.
3. Click **Remove** on the same product.

## Expected
Button returns to **Add to cart**; cart badge disappears.

## Actual
Button still reads **Remove**; badge still shows **1**.

## Impact
Users cannot correct their cart from the Products page, so they may check out with items they did not want. Kept at P2 (not P1) on the assumption that removal from the Cart page is a workaround — that path is not yet covered by a test and should be confirmed during triage.

## Evidence
![BUG-003 inventory after remove click](evidence/BUG-003/inventory-after-remove-click.png)

- Screenshot after clicking Remove: [inventory-after-remove-click.png](evidence/BUG-003/inventory-after-remove-click.png)
- Video: [video.webm](evidence/BUG-003/video.webm) · Trace: [trace.zip](evidence/BUG-003/trace.zip)
- Assertion output: [assertion-failures.txt](evidence/BUG-003/assertion-failures.txt)

## Automated test
`tests/problem-user/known-defects.spec.ts` › *BUG-003 an added product can be removed from the inventory page* (`@BUG-003 @sev-high @P2`)
