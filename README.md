# saucedemo-qa

Playwright + TypeScript test automation and defect reports for [saucedemo.com](https://www.saucedemo.com).

Two accounts are tested side by side:

- **`standard_user`** — the baseline. Every regression test passes.
- **`problem_user`** — runs the same expectations. Six defects were found, reported in [`bugs/`](bugs/README.md) with evidence, and each is covered by an automated test.

## Project structure

```
playwright.config.ts        projects: setup → login / standard-user / problem-user
fixtures/test.ts            test.extend() fixtures that inject page objects
pages/                      Page Object Model (Login, Inventory, Product, Cart, Checkout)
test-data/                  users, products, checkout customer
tests/
  auth.setup.ts             logs in each user once, saves storageState
  login/                    login flows (no stored session)
  standard-user/            regression suite — must stay green
  problem-user/             known-defects suite — one test per bug, marked test.fail()
scripts/collect-evidence.ts copies each bug's screenshots/video/trace into bugs/evidence/
bugs/                       defect board, one report per bug, evidence, Jira CSV
```

Conventions:

- Locators use `getByTestId()` with `testIdAttribute: 'data-test'`, or `getByRole()`.
- Web-first assertions only (`await expect(locator)…`); no fixed waits.
- Login runs once per user in the `setup` project; tests reuse the session via `storageState`.
- Defect tests assert the **correct** behaviour and are marked `test.fail()`. The suite stays green while the bug exists. When a bug is fixed, Playwright reports an unexpected pass, which is the signal to verify and close the ticket.
- Tags: `@smoke`, `@BUG-xxx`, `@sev-critical|high|medium`, `@P1|P2|P3`.

## Running

```bash
npm install
npx playwright install chromium

npm test                  # everything
npm run test:regression   # login + standard_user
npm run test:defects      # problem_user known defects
npm run test:p1           # only P1 defects (--grep @P1)
npx playwright test --grep @sev-critical
npm run evidence          # refresh bugs/evidence/
npm run evidence:export   # also copy screenshots to ~/Desktop/saucedemo-bug-screenshots
npm run report            # open the HTML report
```

The password defaults to the public demo password; override with `SAUCE_PASSWORD`.

## Defects found

| ID | Severity | Priority | Summary |
|---|---|---|---|
| BUG-001 | Critical | P1 | Checkout: typing Last Name overwrites First Name; checkout blocked |
| BUG-002 | High | P1 | Add to cart does nothing for 3 of 6 products |
| BUG-003 | High | P2 | Remove button on Products page does not remove the item |
| BUG-004 | High | P2 | Clicking a product opens a different product's page |
| BUG-006 | Medium | P2 | Every product shows the same placeholder image |
| BUG-005 | Medium | P3 | Product sort dropdown has no effect |

Full reports, evidence and severity/priority definitions: [`bugs/README.md`](bugs/README.md).
