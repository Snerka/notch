import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',         // folder where tests will be
  timeout: 30 * 1000,         // max time per test
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://wearenotch.com',
    ignoreHTTPSErrors: true,
  },
  reporter: [['html', { outputFolder: 'reports/html' }]],  // HTML report
});
