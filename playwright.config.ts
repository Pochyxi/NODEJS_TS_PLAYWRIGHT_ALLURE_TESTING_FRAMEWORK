import { defineConfig, devices } from '@playwright/test';
const {JSONScribe} = require("./Utils/JSONScribe.ts")

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

class ProjectAgent {
  private jsonScribe;
  private projectArchive = [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'ENOSIS_V_0_1_0',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
  private elaborateProjectArchive = []

  constructor(path) {
    this.jsonScribe = new JSONScribe(path)
    console.log("JSON letto correttamente")
    console.log(this.jsonScribe.getOBJ)
  }

  setProjectStructure() {
    for (let stringProject of this.jsonScribe.getOBJ().projects) {
      let finded = this.projectArchive.find(e => e.name === stringProject)

      if (finded != undefined) this.elaborateProjectArchive.push(finded)
    }

    console.log("Ecco il progetto elaborato -> ")
    console.log(this.elaborateProjectArchive)

    return this.elaborateProjectArchive
  }

}

const projectArr = new ProjectAgent("./json_configs/pw_config.json").setProjectStructure()

export default defineConfig({
  testDir: './tests',
  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 30000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'],
    // ['./my-awesome-reporter.ts'],
    ['allure-playwright', {outputFolder: 'allure-results'}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: projectArr

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
