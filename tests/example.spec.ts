import {test, expect} from '@playwright/test';
const { StepperGen } = require('../Utils/StepperGen.ts')

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
//
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
//
// const pageSelectors = {
//   pageUrl: 'https://rahulshettyacademy.com/AutomationPractice/',
//   inputRadio1: "#radio-btn-example > fieldset > label:nth-child(2) > input",
//   inputRadio2: "#radio-btn-example > fieldset > label:nth-child(3) > input",
//   inputRadio3: "#radio-btn-example > fieldset > label:nth-child(4) > input",
// }
//
// test('Corso rahul shetty', async ({ page }, testInfo) => {
//
//   console.log('Raggiungo paggina')
//   await page.goto(pageSelectors.pageUrl);
//
//   await test.step("Click sul primo radio button", async() => {
//     await clickAndCheckInputRadio(page, pageSelectors.inputRadio1)
//
//     await testInfo.attach("Click sul primo radio button", {
//       body: await page.screenshot({ fullPage: true }),
//       contentType: "image/png",
//     })
//   })
//
//
//
//   await clickAndCheckInputRadio(page, pageSelectors.inputRadio2)
//   await clickAndCheckInputRadio(page, pageSelectors.inputRadio3)
//
// })
//
// async function clickAndCheckInputRadio(page, inputRadioSelector:string) {
//   const propertyName = Object.entries(pageSelectors).find(([key, value]) => value === inputRadioSelector)[0];
//
//   console.log("Eseguo click del selettore: " + propertyName)
//   await page.locator(inputRadioSelector).click()
//
//   const boolInputRadio1Selector = await page.locator(inputRadioSelector).isChecked()
//   console.log("Il selettore è selezionato? " + boolInputRadio1Selector)
//   expect(boolInputRadio1Selector).toBeTruthy()
// }

const arrOfStepObj = [
    {
        stepName: "Atterraggio Pagina",
        actionName: "goto",
        args: {
            url: "https://rahulshettyacademy.com/AutomationPractice/",
        }
    },
    {
        stepName: "Click radio button 1",
        actionName: "click_radio_button_and_check",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(2) > input",
        }
    },
    {
        stepName: "Click radio button 2",
        actionName: "click_radio_button_and_check",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(3) > input",
        }
    },
    {
        stepName: "Click radio button 3",
        actionName: "click_radio_button_and_check",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(4) > input",
        }
    }
]

const stepperGen = new StepperGen(test, arrOfStepObj)
stepperGen.runTest('@chrome CarmineUrcioli')
