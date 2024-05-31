import {defineConfig, devices} from '@playwright/test';
const {nomeProgetto} = require('./CONFIG.ts')
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
    private projectObject = []


    constructor(path) {
        this.jsonScribe = new JSONScribe(path)
        console.log("JSON letto correttamente")
        console.log(this.jsonScribe.getOBJ)
        this.setProjectObject(
            this.jsonScribe.getOBJ().info.name,
            this.jsonScribe.getOBJ().info.browsers
        )
        console.log("Project object: " + this.projectObject)
    }

    setProjectObject(projectName, browserName) {
        for (let name of browserName) {
            switch (name) {
                case "chrome":
                    this.projectObject.push({
                        name: projectName + "--" + name,
                        use: {...devices['Desktop Chrome'],
                    }})
                    break
                case "firefox":
                    this.projectObject.push({
                        name: projectName + "--" + name,
                        use: {...devices['Desktop Firefox']}
                    })
                    break
                case "safari":
                    this.projectObject.push({
                        name: projectName + "--" + name,
                        use: {...devices['Desktop Safari']}
                    })
                    break
                default:
                    console.log("Nessun browser fornito!!")
            }
        }
    }

    getProjectObject() {
        return this.projectObject
    }

}


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
    projects: new ProjectAgent("./test-suites/" + nomeProgetto + ".json").getProjectObject()


});
