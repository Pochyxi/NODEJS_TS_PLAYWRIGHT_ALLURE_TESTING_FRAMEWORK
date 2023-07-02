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
    private readonly test;
    private readonly arrOfStepObj;
    private pdfReporter;
    private pdfName;
    private resultTest
    private readonly internalTimeout;

    constructor(test, arrOfStepObj) {
        this.test = test;
        this.arrOfStepObj = arrOfStepObj;
        this.pdfReporter = new PDFReporter();
        this.resultTest = true;
        this.internalTimeout = 30 * 1000;
    }


    runTest(testName) {
        // ******* SETTA LA GRANDEZZA SCHERMO
        // this.test.use({
        //     viewport: { width: 1600, height: 1200 },
        // });

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
                        is.pdfReporter.savePDF(is.pdfName, "L'azione ha richiesto troppo tempo per essere eseguita (più di " + (timeout / 1000) + " secondi)")
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
                    case "atterraggio_pagina":
                        await withTimeout(
                            await this.atterraggioPagina(stepObj.args.url, page, testinfo),
                            this.internalTimeout, this
                        );
                        break;
                    case "clic_radio_e_controlla_stato":
                        await withTimeout(
                            this.clickAndCheckInputRadio(page, testinfo, stepObj.stepName, stepObj.args.selector),
                            this.internalTimeout, this
                        );
                        break;

                    case "clicca":
                        await withTimeout(
                            this.click(page, testinfo, stepObj.stepName, stepObj.args.selector),
                            this.internalTimeout, this
                        );
                        break;
                    case "inserisci_testo":
                        await withTimeout(
                            this.writeFill(page, testinfo, stepObj.stepName, stepObj.args.selector, stepObj.args.text),
                            this.internalTimeout, this
                        );
                        break;
                    case "controlla":
                        await withTimeout(
                            this.controlla(page, testinfo, stepObj.stepName, stepObj.args.selector),
                            this.internalTimeout, this
                        );
                        break;
                    default:
                        console.log("Non ho trovato l'azione: " + stepObj.actionName)
                }
            }

            this.pdfReporter.savePDF(this.pdfName, false)
        })
    }

    async atterraggioPagina(url, page, testinfo) {
        console.log('Raggiungo paggina -> ' + url)
        await test.step("Atterraggio Pagina", async () => {
            await page.goto(url);

            await this.takeScreenshot(page, testinfo, "Raggiungo paggina")
        })
    }

    async click(page, testinfo, stepName, selector) {
        await test.step(stepName, async () => {

            console.log("Eseguo click del selettore: " + selector)
            await page.locator(selector).click()

            await this.takeScreenshot(page, testinfo, stepName)
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

    async writeFill(page, testinfo, stepName, selector, text) {
        await test.step(stepName, async () => {

            console.log("Inserisco ['"+ text +"'] nel selettore: " + selector)
            await page.locator(selector).fill(text)

            await this.takeScreenshot(page, testinfo, stepName)
        })
    }

    async controlla(page, testinfo, stepName, selector) {
        await test.step(stepName, async () => {

            console.log("Controlle l'elemento con selettore: " + selector)
            await page.locator(selector).check()

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