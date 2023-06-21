const {executeTest} = require('./Utils/TestAndReport.ts')

/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {String} testName - Il nome del file o del singolo test da eseguire
 * @param {Boolean} {single} - Default false - Specifica se il nome dato è un singolo test oppure un file
 * @param {Boolean} {show} - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 */
executeTest(
    "",
    {
        show: true,
        single: false,
    })