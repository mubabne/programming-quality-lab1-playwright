import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Тестүүдийг зэрэг ажиллуулна.
  fullyParallel: true,
  // Автомат шалгалтаар зөвхөн нэг тест сонгож үлдээхээс сэргийлнэ.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // Үр дүнг HTML тайлангаар гаргана.
  reporter: 'html',
  use: {
    // Эхний давтан оролдлогын бичлэгийг хадгална.
    trace: 'on-first-retry',
  },
  // Гурван хөтөч дээр шалгана.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
