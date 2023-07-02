const {executeTest} = require('./Utils/TestAndReport.ts')

/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {String} testName - Il nome del progetto
 * @param {boolean} project - Il nome del file o del singolo test da eseguire
 * @param {Boolean} {single} - Default false - Specifica se il nome dato è un singolo test oppure un file
 * @param {Boolean} {show} - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 * @param {Boolean} {showDashBoard} - Default false - Apre la dashboard di Allure
 */
executeTest(
    //NOME DEL TEST(singolo test) / NOME CARTELLA(tutti i file script) / NOME FILE(singolo file script)
    // "" per eseguire TUTTO
    "Prova_con_write_and_click",
    {
        // Progetti presenti in playwright.config.ts
        project: "webkit",
        // Se il test è singolo bisogna specificarlo con true, altrimenti false
        single: true,
        // Visualizza i test oppure li esegue in background
        show: true,
        // Apre la dashboard di Allure
        showDashboard: false
    })