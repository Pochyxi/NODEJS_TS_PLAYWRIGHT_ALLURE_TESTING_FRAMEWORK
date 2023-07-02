const {executeTest} = require('./Utils/TestAndReport.ts')
const {JSONScribe} = require("./Utils/JSONScribe.ts")

/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {boolean} project - Il nome del file o del singolo test da eseguire
 * @param {Boolean} show - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 * @param {Boolean} showDashBoard - Default false - Apre la dashboard di Allure
 */

const projectJSONPath = "./test-suites/ENOSIS.json"
const projectName = new JSONScribe(projectJSONPath).getProjectName();


executeTest(
    {
        // Progetti presenti in playwright.config.ts
        project: projectName,
        // La path del JSON
        projectJSONPath: projectJSONPath,
        // Visualizza i test oppure li esegue in background
        show: true,
        // Apre la dashboard di Allure
        showDashboard: false
    })