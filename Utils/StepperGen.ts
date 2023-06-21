import {expect, test} from "@playwright/test";
const path = require('path');
const {PDFReporter} = require('./PDFReporter.ts')

const pageSelectors = {
    pageUrl: 'https://rahulshettyacademy.com/AutomationPractice/',
    inputRadio1: "#radio-btn-example > fieldset > label:nth-child(2) > input",
    inputRadio2: "#radio-btn-example > fieldset > label:nth-child(3) > input",
    inputRadio3: "#radio-btn-example > fieldset > label:nth-child(4) > input",
}

class StepperGen {
    _test;
    _arrOfStepObj;
    _pdfReporter;

    constructor(test, arrOfStepObj) {
        this._test = test;
        this._arrOfStepObj = arrOfStepObj;
        this._pdfReporter = new PDFReporter();
    }


    runTest(testName) {
        this._test(testName, async ({ page }, testinfo) => {


            for (const stepObj of this._arrOfStepObj) {
                switch (stepObj.actionName) {
                    case "goto":
                        await this.atterraggioPagina(stepObj.args.url, page, testinfo)
                        break;
                    case "click_radio_button_and_check":
                        await this.clickAndCheckInputRadio(page, testinfo,stepObj.stepName, stepObj.args.selector)
                        break;
                    default:
                        console.log("Non ho trovato l'azione: " + stepObj.actionName)
                }
            }

            this._pdfReporter.savePDF(testinfo.title)
        })
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
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const dateName = `${year}_${month}_${day}__${hours}_${minutes}`;

        const screenshotName = `${testinfo.title}__${name}__${dateName}.png`;
        const screenshotPath = path.join('json_configs/img/', screenshotName);

        await page.screenshot({ path: screenshotPath });

        this._pdfReporter.insertStepPDF(screenshotPath, name)
    }
}

module.exports= {
    StepperGen
}