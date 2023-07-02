const {executeTest} = require('./Utils/TestAndReport.ts')

/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {boolean} project - Il nome del file o del singolo test da eseguire
 * @param {Boolean} show - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 * @param {Boolean} showDashBoard - Default false - Apre la dashboard di Allure
 */


executeTest(
    {
        project: "ENOSIS_V_0_1_0",
        show: false,
        // Apre la dashboard di Allure
        showDashboard: false
    })