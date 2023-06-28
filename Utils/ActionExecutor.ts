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
    _test;
    _arrOfStepObj;
    _pdfReporter;
    _pdfName;

    constructor(test, arrOfStepObj) {
        this._test = test;
        this._arrOfStepObj = arrOfStepObj;
        this._pdfReporter = new PDFReporter();
    }


    runTest(testName) {
        this._test(testName, async ({ page }, testinfo) => {
            this._pdfReporter.addHeader(
                testinfo.title,
                testinfo.project.name,
                this.getActualDateStringObj().day + "/" + this.getActualDateStringObj().month + "/" + this.getActualDateStringObj().year,
                this.getActualDateStringObj().hours + ":" + this.getActualDateStringObj().minutes
            )


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

            this._pdfReporter.savePDF(this._pdfName)
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

        this._pdfName = testinfo.title + "__" + testinfo.project.name + "__" + this.getActualDateStringObj().dateName

        const screenshotName = `${testinfo.title}__${name}__${this.getActualDateStringObj().dateName}.png`;
        const screenshotPath = path.join('PDFReports/img/', screenshotName);

        await page.screenshot({ path: screenshotPath });

        this._pdfReporter.insertStepPDF(screenshotPath, name)
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

module.exports= {
    ActionExecutor: ActionExecutor
}