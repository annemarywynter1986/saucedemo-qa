# Defect board — saucedemo.com

Seven defects found by comparing `problem_user` against `standard_user` (baseline, where every flow passes). Each defect has a report, evidence (screenshots, video, Playwright trace, assertion output), and an automated test tagged with its ID, severity and priority.

## Board (sorted by severity, then priority)

| ID | Title | Severity | Priority | Component | Test tag |
|---|---|---|---|---|---|
| [BUG-001](BUG-001-checkout-last-name-overwrites-first-name.md) | Checkout: typing Last Name overwrites First Name; checkout blocked | Critical | P1 | Checkout | `@BUG-001` |
| [BUG-002](BUG-002-add-to-cart-fails-for-three-products.md) | Add to cart does nothing for 3 of 6 products | High | P1 | Inventory › Cart | `@BUG-002` |
| [BUG-003](BUG-003-remove-from-cart-does-nothing-on-inventory.md) | Remove button on Products page does not remove the item | High | P2 | Inventory › Cart | `@BUG-003` |
| [BUG-004](BUG-004-product-link-opens-wrong-product.md) | Clicking a product opens a different product's page | High | P2 | Inventory › Navigation | `@BUG-004` |
| [BUG-007](BUG-007-fleece-jacket-opens-item-not-found.md) | Fleece Jacket opens "ITEM NOT FOUND" ($√-1); Add to cart creates a phantom item | High | P2 | Product detail | `@BUG-007` |
| [BUG-006](BUG-006-all-product-images-show-placeholder.md) | Every product shows the same placeholder image | Medium | P2 | Inventory › Images | `@BUG-006` |
| [BUG-005](BUG-005-product-sort-has-no-effect.md) | Product sort dropdown has no effect | Medium | P3 | Inventory › Sort | `@BUG-005` |

**Sprint recommendation:** BUG-001 and BUG-002 go into the current sprint (they block or cut revenue). BUG-003, BUG-004, BUG-007 and BUG-006 are next-sprint candidates. BUG-005 goes to the backlog.

## Severity — how bad is the impact?

| Severity | Definition |
|---|---|
| Critical | Core business flow is blocked with no workaround (cannot buy). |
| High | Major feature broken or gives wrong results; a workaround may exist. |
| Medium | Feature degraded or confusing; the user can still finish the task. |
| Low | Cosmetic or minor wording issue. |

## Priority — how soon do we fix it?

| Priority | Definition |
|---|---|
| P1 | Fix in the current sprint; hotfix if already in production. |
| P2 | Plan for the next sprint. |
| P3 | Backlog; groomed in a later refinement session. |
| P4 | Nice to have. |

Severity and priority are set separately: BUG-006 is Medium severity (nothing breaks) but P2 priority, because it is on the landing page every shopper sees.

## Defect workflow

`New → Triaged (severity/priority agreed in refinement) → In Progress → Ready for QA → Verified → Closed`

A defect is **Verified** when its automated test passes unexpectedly (Playwright flags it), the `test.fail()` line is removed, and the full suite is green.

## Re-generating evidence

```bash
npm run evidence          # runs the problem_user suite and refreshes bugs/evidence/
npm run evidence:export   # same, plus copies all screenshots to ~/Desktop/saucedemo-bug-screenshots
```

`bugs/jira-import.csv` holds the same seven tickets for import into Jira (or any tracker that takes CSV).
