import {test, expect} from '@playwright/test';
const {ActionExecutor} = require('../Utils/ActionExecutor.ts')


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


const testExecutor = new ActionExecutor(test, arrOfStepObj)
testExecutor.runTest('Prova_1')

const testExecutor2 = new ActionExecutor(test, arrOfStepObj)
testExecutor2.runTest('Prova_2')





