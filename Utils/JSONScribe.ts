const fs = require('fs-extra');

// Crea una cartella
fs.ensureDirSync('json_configs');

// Creare un oggetto JSON
const data = { name: 'John', age: 30 };

// Scrivere l'oggetto JSON su un file
fs.writeJSONSync('file.json', data);

// Leggere un file JSON
const readData = fs.readJSONSync('file.json');
console.log(readData); // { name: 'John', age: 30 }

// Modificare il contenuto del file JSON
readData.age = 31;
fs.writeJSONSync('file.json', readData);

// Eliminare un file JSON
// fs.removeSync('file.json');