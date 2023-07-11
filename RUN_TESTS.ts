const {executeTest} = require('./Utils/TestAndReport.ts')

/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {Boolean} show - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 * @param {Boolean} showDashBoard - Default false - Apre la dashboard di Allure
 */


executeTest(
    {
        show: true,
        showDashboard: false
    })