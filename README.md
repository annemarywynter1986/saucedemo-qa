# saucedemo-qa

[![Playwright Tests](https://github.com/annemarywynter1986/saucedemo-qa/actions/workflows/playwright.yml/badge.svg)](https://github.com/annemarywynter1986/saucedemo-qa/actions/workflows/playwright.yml)

Playwright + TypeScript test automation and defect reports for [saucedemo.com](https://www.saucedemo.com).

Two accounts are tested side by side:

- **`standard_user`**: the baseline. Every regression test passes.
- **`problem_user`**: runs the same expectations. **Seven defects** were found, reported in [`bugs/`](bugs/README.md) with screenshots, video and Playwright traces, and each is covered by an automated test.

## Approach

1. **Manual exploratory testing.** Logged in as both users and compared behaviour. Five defects were found by hand: wrong product images, add to cart failing, wrong product details, checkout blocked, and sorting not working.
2. **Automation.** Wrote the correct behaviour as Playwright tests, ran them against both users, and confirmed every manual finding. Automation also surfaced BUG-003 (Remove does nothing) and showed that the "wrong product" defect includes a broken *ITEM NOT FOUND* page (BUG-007).
3. **Logging.** Each defect has a report with steps, expected/actual, impact, severity and priority, plus evidence captured by the tests themselves.
4. **Triage (agile).** Severity (impact) and priority (urgency) are set separately; P1 bugs go into the current sprint, P2 into the next, P3 into the backlog. See the [defect board](bugs/README.md).

## Defects found

| ID | Severity | Priority | Summary |
|---|---|---|---|
| [BUG-001](bugs/BUG-001-checkout-last-name-overwrites-first-name.md) | Critical | P1 | Checkout: typing Last Name overwrites First Name; order cannot be placed |
| [BUG-002](bugs/BUG-002-add-to-cart-fails-for-three-products.md) | High | P2 | Add to cart does nothing for 3 of 6 products |
| [BUG-003](bugs/BUG-003-remove-from-cart-does-nothing-on-inventory.md) | High | P2 | Remove button on Products page does not remove the item |
| [BUG-004](bugs/BUG-004-product-link-opens-wrong-product.md) | High | P2 | Clicking a product opens a different product's page |
| [BUG-007](bugs/BUG-007-fleece-jacket-opens-item-not-found.md) | High | P2 | Fleece Jacket opens "ITEM NOT FOUND" ($√-1); Add to cart creates a phantom item |
| [BUG-006](bugs/BUG-006-all-product-images-show-placeholder.md) | Medium | P2 | Every product shows the same placeholder image |
| [BUG-005](bugs/BUG-005-product-sort-has-no-effect.md) | Medium | P3 | Product sort dropdown has no effect |

Severity/priority definitions, the defect workflow and the sprint recommendation are in [`bugs/README.md`](bugs/README.md).

## Test suite

27 tests in 5 files, Chromium:

| Project | Tests | What it covers |
|---|---|---|
| `setup` | 2 | Logs in `standard_user` and `problem_user` once and saves each session |
| `login` | 5 | Both users log in; `locked_out_user` refused; wrong password refused; inventory blocked without a session |
| `standard-user` | 12 | Product images, sorting (Z→A, price low→high), all six product links, add to cart, remove, end-to-end checkout |
| `problem-user` | 8 | One test per defect, BUG-001 to BUG-007, plus the BUG-003 Cart-page workaround |

## Project structure

```
playwright.config.ts            projects: setup → login / standard-user / problem-user
fixtures/test.ts                test.extend() fixtures that inject page objects
pages/                          Page Object Model (Login, Inventory, Product, Cart, Checkout)
test-data/                      users, products, checkout customer
tests/
  auth.setup.ts                 logs in each user once, saves storageState
  login/                        login flows (no stored session)
  standard-user/                regression suite (must stay green)
  problem-user/                 known-defects suite (one test per bug, marked test.fail())
scripts/
  collect-evidence.ts           copies each bug's screenshots/video/trace into bugs/evidence/
  record-walkthrough.ts         records one captioned video walking through every defect (+ annotated screenshots)
bugs/
  README.md                     defect board, severity/priority definitions, workflow
  BUG-00x-*.md                  one report per defect, screenshots embedded
  evidence/BUG-00x/             test screenshots, video.webm, trace.zip, assertion output
  evidence/annotated/           one captioned, outlined screenshot per defect moment
  evidence/saucedemo-bug-walkthrough.webm  captioned video of all seven defects
  jira-import.csv               all seven tickets for Jira CSV import
.github/workflows/playwright.yml  runs the full suite on every push and pull request
```

## Conventions

- Locators use `getByTestId()` with `testIdAttribute: 'data-test'`, or `getByRole()`.
- Web-first assertions only (`await expect(locator)…`); no fixed waits in tests.
- Login runs once per user in the `setup` project; tests reuse the session via `storageState`.
- Defect tests assert the **correct** behaviour and are marked `test.fail()`. The suite stays green while the bug exists. When a bug is fixed, Playwright reports an unexpected pass, which is the signal to verify and close the ticket.
- Every defect test attaches a named screenshot at the moment the bug shows, plus a final-state screenshot, video and trace.
- Tags: `@smoke`, `@BUG-xxx`, `@sev-critical|high|medium`, `@P1|P2|P3`.

## Getting started

Requires Node.js 23.6 or later (scripts are TypeScript run directly by Node).

```bash
git clone https://github.com/annemarywynter1986/saucedemo-qa.git
cd saucedemo-qa
npm install
npx playwright install chromium
```

## Running

```bash
npm test                  # everything
npm run test:regression   # login + standard_user
npm run test:defects      # problem_user known defects
npm run test:p1           # only P1 defects (--grep @P1)
npx playwright test --grep @sev-critical
npm run report            # open the HTML report (screenshots, video, trace per test)
npm run typecheck         # TypeScript check
```

The password defaults to the public demo password; override with `SAUCE_PASSWORD`.

## Evidence

```bash
npm run evidence          # re-run the defect tests and refresh bugs/evidence/
npm run evidence:export   # same, plus copy every screenshot to ~/Desktop/saucedemo-bug-screenshots
npm run walkthrough       # record a captioned video of all seven defects to ~/Desktop/saucedemo-bug-screenshots/
npm run evidence:annotated # same video, plus one annotated screenshot per defect (caption + red outline) in bugs/evidence/annotated/
```

- **Annotated screenshots** (`bugs/evidence/annotated/`) show each defect with a caption bar and a red outline on the broken element; they lead each bug report's Evidence section.
- **Test screenshots** are captured by the automated tests and stored in `bugs/evidence/BUG-00x/`.
- **Reproducibility** is recorded in each report where it was measured (BUG-003: 10/10 automated runs and 15/15 scripted attempts).
- **Traces**: open one with `npx playwright show-trace bugs/evidence/BUG-001/trace.zip` to step through every action, DOM snapshot and network call.
- **Walkthrough video:** [`bugs/evidence/saucedemo-bug-walkthrough.webm`](bugs/evidence/saucedemo-bug-walkthrough.webm) shows all seven defects in one captioned recording (about 1.5 minutes).
- **Videos** (`.webm`) play in Chrome, Firefox or VLC, and in Jira; QuickTime does not play WebM.
- **CI**: each GitHub Actions run uploads the HTML report as the `playwright-report` artifact.

## Logging the defects in Jira

- **One at a time:** create a Bug, copy the Summary, Steps, Expected, Actual and Impact sections from the bug report, set Priority (P1 → Highest, P2 → High, P3 → Medium), add severity as a custom field or a `sev-*` label, and attach the screenshots from `bugs/evidence/BUG-00x/` (or the Desktop export).
- **All at once:** import `bugs/jira-import.csv` (Jira → Import issues → CSV), map Summary, Priority, Component, Labels and Description, then attach screenshots to each ticket. CSV import cannot upload local files.
- Link each ticket to its automated test (`tests/problem-user/known-defects.spec.ts`, tag `@BUG-00x`) so developers can reproduce it with one command.

## Author

Anne Mary Wynter · [MIT License](LICENSE)
