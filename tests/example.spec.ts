import {test, expect} from '@playwright/test';
const {ActionExecutor} = require('../Utils/ActionExecutor.ts')


const arrOfStepObj = [
    {
        stepName: "Atterraggio Pagina",
        actionName: "atterraggio_pagina",
        args: {
            url: "https://rahulshettyacademy.com/AutomationPractice/",
        }
    },
    {
        stepName: "Click radio button 1",
        actionName: "clic_radio_e_controlla_stato",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(2) > input",
        }
    },
    {
        stepName: "Click radio button 2",
        actionName: "clic_radio_e_controlla_stato",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(3) > input",
        }
    },
    {
        stepName: "Click radio button 3",
        actionName: "clic_radio_e_controlla_stato",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(4) > inputZZ",
        }
    }
]

const provaConWriteAndClick = [
    {
        stepName: "Atterraggio Pagina",
        actionName: "atterraggio_pagina",
        args: {
            url: "https://rahulshettyacademy.com/AutomationPractice/",
        }
    },
    {
        stepName: "Click radio button 1",
        actionName: "clic_radio_e_controlla_stato",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(2) > input",
        }
    },
    {
        stepName: "Click radio button 2",
        actionName: "clic_radio_e_controlla_stato",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(3) > input",
        }
    },
    {
        stepName: "Click radio button 3",
        actionName: "clic_radio_e_controlla_stato",
        args: {
            selector: "#radio-btn-example > fieldset > label:nth-child(4) > input",
        }
    },
    {
        stepName: "Inserisci testo nel campo input",
        actionName: "inserisci_testo",
        args: {
            selector: "#autocomplete",
            text: "Testo inserito CORRETTAMENTE"
        }
    },
    {
        stepName: "Click select di esempio",
        actionName: "clicca",
        args: {
            selector: "#dropdown-class-example",
        }
    },
]


const testExecutor = new ActionExecutor(test, arrOfStepObj)
testExecutor.runTest('Prova_1')

const testExecutor2 = new ActionExecutor(test, provaConWriteAndClick)
testExecutor2.runTest('Prova_con_write_and_click')





