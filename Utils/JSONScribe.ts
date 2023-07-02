const fs = require('fs-extra');


// copy(src, dest[, options], callback): Copia un file o una directory da src a dest. Supporta copie ricorsive di directory e gestisce automaticamente sovrascritture e conflitti di nome.
//
// copySync(src, dest[, options]): Versione sincrona di copy. Copia un file o una directory in modo sincrono.
//
// move(src, dest[, options], callback): Sposta un file o una directory da src a dest. Può essere utilizzato anche per rinominare file o directory.
//
// moveSync(src, dest[, options]): Versione sincrona di move. Sposta un file o una directory in modo sincrono.
//
// ensureDir(path[, options], callback): Assicura che una directory esista. Se la directory non esiste, viene creata in modo ricorsivo.
//
// ensureDirSync(path[, options]): Versione sincrona di ensureDir. Assicura che una directory esista in modo sincrono.
//
// emptyDir(path, callback): Svuota completamente una directory. Rimuove tutti i file e le directory presenti, mantenendo la directory principale.
//
// emptyDirSync(path): Versione sincrona di emptyDir. Svuota completamente una directory in modo sincrono.
//
// remove(path, callback): Rimuove un file o una directory in modo ricorsivo.
//
// removeSync(path): Versione sincrona di remove. Rimuove un file o una directory in modo sincrono.
//
// readJson(file[, options], callback): Legge un file JSON e lo restituisce come un oggetto JavaScript.
//
// readJsonSync(file[, options]): Versione sincrona di readJson. Legge un file JSON in modo sincrono e lo restituisce come un oggetto JavaScript.
//
// writeJson(file, object[, options], callback): Scrive un oggetto JavaScript come file JSON.
//
// writeJsonSync(file, object[, options]): Versione sincrona di writeJson. Scrive un oggetto JavaScript come file JSON in modo sincrono.
//
// outputJson(file, object[, options], callback): Scrive un oggetto JavaScript come file JSON, assicurandosi che la directory di destinazione esista.
//
// outputJsonSync(file, object[, options]): Versione sincrona di outputJson. Scrive un oggetto JavaScript come file JSON in modo sincrono, assicurandosi che la directory di destinazione esista.

// Crea una cartella
// fs.ensureDirSync('json_configs');

// Creare un oggetto JSON
// const data = { name: 'John', age: 30 };

// Scrivere l'oggetto JSON su un file
// fs.writeJSONSync('json_configs/file.json', data);

// Leggere un file JSON
// const readData = fs.readJSONSync('file.json');
// console.log(readData); // { name: 'John', age: 30 }

// Modificare il contenuto del file JSON
// readData.age = 31;
// fs.writeJSONSync('file.json', readData);

// Eliminare un file JSON
// fs.removeSync('file.json');

class JSONScribe {

    internalPath;
    projectObject;


    constructor(path) {
        this.internalPath = path;
        this.projectObject = fs.readJSONSync(this.internalPath);
    }

    getProjectName() {
        return this.projectObject.info.name;
    }

    getAllCapTests(capName) {
        return this.projectObject.tests[capName];
    }

    getRunType() {
        return this.projectObject.info.runType;
    }

    getRunName() {
        return this.projectObject.info.runName;
    }

    findValueByKey(searchKey) {
        const stack = [this.projectObject.tests]; // Utilizziamo una pila per mantenere traccia degli oggetti da esaminare

        while (stack.length > 0) {
            const currentObj = stack.pop(); // Prendi l'oggetto corrente dalla cima della pila

            for (let key in currentObj) {
                if (currentObj.hasOwnProperty(key)) {
                    if (key === searchKey) {
                        return currentObj[key]; // Restituisci il valore corrispondente alla chiave trovata
                    }

                    // Verifica se il valore corrente è un oggetto e lo aggiungi alla pila
                    if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                        stack.push(currentObj[key]);
                    }
                }
            }
        }

        return null; // Se la chiave non viene trovata, restituisci null
    }

}

// const enosisOBJ = new JSONScribe("../test-suites/ENOSIS.json")

module.exports = {
    JSONScribe: JSONScribe
}
