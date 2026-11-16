import { defineConfig, devices } from '@playwright/test';

export const STORAGE_STATE = {
  standard: 'playwright/.auth/standard_user.json',
  problem: 'playwright/.auth/problem_user.json',
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],

  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    // Login flows run without a stored session.
    { name: 'login', testDir: './tests/login', use: { ...devices['Desktop Chrome'] } },

    // Baseline: standard_user should pass every test.
    {
      name: 'standard-user',
      testDir: './tests/standard-user',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE.standard },
    },

    // Defects: problem_user runs the same expectations; known bugs are marked test.fail().
    // Full evidence (trace, video, screenshot) is kept for every run in this project.
    {
      name: 'problem-user',
      testDir: './tests/problem-user',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE.problem,
        trace: 'on',
        screenshot: 'on',
        video: 'on',
      },
    },
  ],
});
