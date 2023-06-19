const select = require('cli-select');

const options = [
    'Opzione 1',
    'Opzione 2',
    'Opzione 3',
    'Esci'
];

// function displayMenu() {
//     console.log('Seleziona una opzione:');
//     options.forEach((option, index) => {
//         console.log(`${index + 1}. ${option}`);
//     });
// }

function handleChoice(choice) {
    if (choice.id === options.length) {
        console.log('Arrivederci!');
    } else {
        console.log(`Hai selezionato l'opzione ${choice.id}: ${options[choice.id - 1]}`);
        // Esegui l'azione corrispondente all'opzione selezionata
    }
}

// displayMenu();

select({
    values: options,
    selected: '>',
    unselected: ' ',
    indentation: 2
}).then(handleChoice);
