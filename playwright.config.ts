import { defineConfig, devices } from '@playwright/test'
import type { ViewportSize } from '@playwright/test'

const viewport: Record<string, ViewportSize> = {
  MacBook: { width: 1536, height: 900 },
  iPad: { width: 810, height: 1080 },
  iPhone: { width: 393, height: 852 }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: viewport[process.env.DEVICE ?? 'MacBook']
      }
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: viewport[process.env.DEVICE ?? 'MacBook']
      }
    },
    {
      name: 'Webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: viewport[process.env.DEVICE ?? 'MacBook']
      }
    }
  ]
})
