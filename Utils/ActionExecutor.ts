import {expect, test} from "@playwright/test";

const path = require('path');
const {PDFReporter} = require('./PDFReporter.ts')

const pageSelectors = {
    pageUrl: 'https://rahulshettyacademy.com/AutomationPractice/',
    inputRadio1: "#radio-btn-example > fieldset > label:nth-child(2) > input",
    inputRadio2: "#radio-btn-example > fieldset > label:nth-child(3) > input",
    inputRadio3: "#radio-btn-example > fieldset > label:nth-child(4) > input",
}

class ActionExecutor {
    private test;
    private arrOfStepObj;
    private pdfReporter;
    private pdfName;
    private resultTest
    private waitTestFinish: boolean = true;

    constructor(test, arrOfStepObj) {
        this.test = test;
        this.arrOfStepObj = arrOfStepObj;
        this.pdfReporter = new PDFReporter();
        this.resultTest = true;
    }


    runTest(testName) {

        this.test(testName, async ({page}, testinfo) => {
            this.pdfReporter.addHeader(
                testinfo.title,
                testinfo.project.name,
                this.getActualDateStringObj().day + "/" + this.getActualDateStringObj().month + "/" + this.getActualDateStringObj().year,
                this.getActualDateStringObj().hours + ":" + this.getActualDateStringObj().minutes
            )

            async function withTimeout(promise, timeout, is) {
                let timeoutId;

                const timeoutPromise = new Promise((resolve, reject) => {
                    timeoutId = setTimeout(() => {
                        is.pdfReporter.savePDF(is.pdfName, true)
                        reject(new Error("Timeout superato"));
                    }, timeout);
                });

                try {
                    return await Promise.race([promise, timeoutPromise]);
                } finally {
                    clearTimeout(timeoutId);
                }
            }


            for (const stepObj of this.arrOfStepObj) {

                switch (stepObj.actionName) {
                    case "goto":
                        await this.atterraggioPagina(stepObj.args.url, page, testinfo)
                        break;
                    case "click_radio_button_and_check":
                        await withTimeout(
                            this.clickAndCheckInputRadio(page, testinfo, stepObj.stepName, stepObj.args.selector),
                            10000, this
                        );
                        break;
                    default:
                        console.log("Non ho trovato l'azione: " + stepObj.actionName)
                }
            }

            this.pdfReporter.savePDF(this.pdfName, false)
        })
    }

    timeLimit() {
        setTimeout(() => {
            this.pdfReporter.savePDF(this.pdfName, true)
        }, 30 * 1000)
    }

    async atterraggioPagina(url, page, testinfo) {
        console.log('Raggiungo paggina -> ' + url)
        await test.step("Atterraggio Pagina", async () => {
            await page.goto(url);

            await this.takeScreenshot(page, testinfo, "Raggiungo paggina")
        })
    }

    async clickAndCheckInputRadio(page, testinfo, stepName, inputRadioSelector) {
        await test.step(stepName, async () => {

            console.log("Eseguo click del selettore: " + inputRadioSelector)
            await page.locator(inputRadioSelector).click()

            const boolInputRadio1Selector = await page.locator(inputRadioSelector).isChecked()
            console.log("Il radio button è selezionato? " + boolInputRadio1Selector)
            expect(boolInputRadio1Selector).toBeTruthy()


            await this.takeScreenshot(page, testinfo, stepName)
        })
    }

    async takeScreenshot(page, testinfo, name) {

        this.pdfName = testinfo.title + "__" + testinfo.project.name + "__" + this.getActualDateStringObj().dateName

        const screenshotName = `${testinfo.title}__${name}__${this.getActualDateStringObj().dateName}.png`;
        const screenshotPath = path.join('PDFReports/img/', screenshotName);

        await page.screenshot({path: screenshotPath});

        this.pdfReporter.insertStepPDF(screenshotPath, name)
    }

    getActualDateStringObj() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const dateName = `${year}_${month}_${day}__${hours}_${minutes}`;

        return {
            dateName: dateName,
            year: year,
            month: month,
            day: day,
            hours: hours,
            minutes: minutes
        }
    }
}

module.exports = {
    ActionExecutor: ActionExecutor
}