const path = require ( 'path' );
const fs = require ( 'fs' );
const {resolve} = require("path");
const {exec} = require("child_process");

/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {String} testName - Il nome del file o del singolo test da eseguire
 * @param {Boolean} {single} - Default false - Specifica se il nome dato è un singolo test oppure un file
 * @param {Boolean} {show} - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 */
function executeTest(testName, params) {
    let checkedSingle = params?.single ? params.single : false
    let checkedShow = params?.show ? params.show : false
    let projectName = params?.project ? " --project=" + params.project : ""


    if (checkedSingle) {
        let conditionalTestName = checkedShow ? '"' + testName + '"' + " --reporter=allure-playwright,line,./my-awesome-reporter.ts" + " --headed" : '"' + testName + '"' + " --reporter=allure-playwright,line,./my-awesome-reporter.ts "
        console.log("ESEGUO SINGOLO TEST DI NOME '" + testName + "'")
        executeTestReportDashboard("test -g " + conditionalTestName + projectName)
    } else {
        let conditionalTestName = checkedShow ? testName + " --reporter=allure-playwright,line,./my-awesome-reporter.ts" + " --headed" : testName + " --reporter=allure-playwright,line,./my-awesome-reporter.ts "
        console.log("ESEGUO TUTTI I TEST NEL GRUPPO TEST DI NOME '" + testName + "'")
        executeTestReportDashboard("test " + conditionalTestName + projectName)
    }

}

/*** Esegue un comando specificato come parametro e gestisce gli output e gli errori.
 * @param {string} command - Il comando da eseguire.
 */
function executeCommand(command) {

    const options = {
        cwd: resolve(__dirname, '../'),
    };

    const childProcess = exec(command, options);

    childProcess.stdout.on('data', (data) => {
        console.log(`Output del comando:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Errore durante l'esecuzione del comando:\n${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Completato con codice di uscita ${code}`);
    });
}


/*** Esegue un comando di test di Playwright e gestisce gli output e gli errori.
 * @param {string} pwCommand Il comando di test di Playwright da eseguire.
 */
function executeTestReportDashboard(pwCommand) {
    console.log("Eseguo comando -> " + 'npx playwright ' + pwCommand)
    const command = 'npx playwright ' + pwCommand
    const options = {
        cwd: resolve(__dirname, '../'),
    };

    const childProcess = exec(command, options);

    childProcess.stdout.on('data', (data) => {
        console.log(`Output del comando:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Errore durante l'esecuzione del comando:\n${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Completato con codice di uscita ${code}`);


        executeAllureReport()
    });
}

/*** Esegue il comando per generare il report di Allure e gestisce gli output e gli errori.
 * In seguito esegue le seguenti funzioni:
 * executeCommand("npx allure open") -> Apre il report di Allure
 * executeCommand("npx playwright show-trace") -> Apre il trace di Playwright
 * copyAndRenameTrace() -> Copia il trace di Playwright, lo rinomina e lo sposta in una cartella
 * */
function executeAllureReport() {
    console.log("Generazione report allure, apertura dashboard allure e lancio del trace viewer")
    console.log("ATTENDERE...")

    const command = "npx allure generate ./allure-results --clean"

    const childProcess = exec(
        command,
        {
            cwd: resolve(__dirname, '../'),
        });

    childProcess.stdout.on('data', (data) => {
        console.log(`Output del comando:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Errore durante l'esecuzione del comando:\n${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Completato con codice di uscita ${code}`);

        executeCommand("npx allure open")
        executeCommand("npx playwright show-trace")
        copyAndRenameTrace()
    });
}


/*** Copia e rinomina le tracce di test in una cartella specificata.
 * @param {string} baseDestinationFolder - La cartella di destinazione base in cui copiare e rinominare le tracce.
 * @param {string} testOriginPath - Il percorso delle tracce di test originali.
 */
function copyAndRenameTrace() {
    let baseDestinationFolder = "./TracesReports";
    const testOriginPath = "./test-results";
    let arrOfTraceNames = getSubfolderNames(testOriginPath);
    let arrOfTracesToOpen = [];

    for (const originalPath of arrOfTraceNames) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        // @ts-ignore
        const formatter = new Intl.DateTimeFormat('it-IT', options);
        const formattedDate = formatter.format(currentDate).split('/');
        const year = formattedDate[2].split(",")[0];
        const month = formattedDate[1];
        const day = formattedDate[0];
        // @ts-ignore
        const time = formattedDate[2].split(",")[1].trim().replaceAll(':', '-');
        const destinationFolder = path.join(baseDestinationFolder, originalPath);
        const datePath = path.join(destinationFolder, year, month, day);
        if (!fs.existsSync(datePath)) {
            fs.mkdirSync(datePath, { recursive: true });
        }

        const folderName = path.basename(path.dirname("./test-results/" + originalPath + "/trace.zip"));
        const newFileName = `${folderName}___${year}-${month}-${day}___${time}`;
        const newPath = path.join(datePath, newFileName);

        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }

        fs.readdirSync(path.join("./test-results", originalPath)).forEach(file => {
            const extension = path.extname(file);

            if (['.zip', '.png', '.webm'].includes(extension)) {
                const newFile = path.join(newPath, path.basename(file));
                const oldFile = path.join("./test-results", originalPath, file);
                arrOfTracesToOpen.push(newFile);

                fs.copyFile(oldFile, newFile, (error) => {
                    if (error) {
                        console.error(`Errore durante la copia del file: ${error}`);
                        return;
                    }
                    console.log(`Traccia copiata e rinominata come: ${newFile}`);
                });
            }
        });
    }


    /*** Restituisce i nomi delle sottocartelle all'interno di una cartella specificata.
     * @param {string} destinationFolder - La cartella di destinazione in cui cercare le sottocartelle.
     * @returns {string[]} - Un array contenente i nomi delle sottocartelle.
     */
    function getSubfolderNames(destinationFolder) {
        const folderNames = [];

        fs.readdirSync ( destinationFolder ).forEach ( (item) => {
            const itemPath = path.join ( destinationFolder , item );
            if ( fs.statSync ( itemPath ).isDirectory () ) {
                folderNames.push ( item );
            }
        } );

        return folderNames;
    }

}


module.exports = {
    executeCommand,
    executeTest
}


