# PLAYWRIGHT DEVELOPEZ FREAMEWORK

L'unico pre-requisito per utilizzare questo framework è avere installato [Node.js](https://nodejs.org/it/).

## Installazione

1. Clona il repository
2. Esegui `npm install` per installare le dipendenze
3. Esegui `node RUN_TESTS.ts` per avviare l'applicazione con il test DEMO

## Funzionalità

### Inizializzazione di un progetto

Per inizializzare un progetto abbiamo innanzitutto bisogno di un file json situato nella cartella
`/test-suites` che conterrà le informazioni necessarie per l'esecuzione dei test. E' importante per convenzione che il file si chiami allo stesso modo in cui si chiama la proprietà 'name' all'interno di 'info'

![Screenshot 2023-07-12 alle 01.04.43.png](..%2F..%2F..%2F..%2F..%2Fvar%2Ffolders%2F0j%2Fs_0ld8095rgg0s3zzl8w_rwr0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_uNMhXu%2FScreenshot%202023-07-12%20alle%2001.04.43.png)

info: Contiene le informazioni generali per l'esecuzione dei test, come il nome del progetto, i browser da utilizzare, il tipo di esecuzione e il nome dell'esecuzione.
Nel caso si specifichino due o più browsers, i test verranno eseguiti su entrambi i browser specificati e in parallelo.

runType: Contiene il tipo di esecuzione, che può essere "cap" o "test", nel primo caso lanciamo tutti i test contenuti in un singolo capitolo specificato in runName, nel secondo specifichiamo il singolo test specificato in runName

tests: Contiene la definizione dei test da eseguire. Nel caso specifico, c'è un test chiamato "Ricerca" che contiene un sotto-test chiamato "Ricerca_soggetto".

Ricerca_soggetto: Rappresenta un test specifico che si concentra sulla ricerca e la visualizzazione dei progetti contenuti nel profilo di Pochyxi su GitHub. Questo test è composto da diversi passaggi (testStep) che rappresentano le azioni da eseguire durante il test.

Ogni testStep ha un nome (stepName), un'azione (actionName) da compiere e gli eventuali argomenti (args) necessari per eseguire l'azione. Gli argomenti possono includere selettori (selector) per individuare elementi nella pagina e dati aggiuntivi come URL o testo da inserire.

Alcuni testStep includono anche una breve descrizione (description) dell'azione da eseguire e un prerequisito (preRequisite) che deve essere soddisfatto prima che il passo possa essere eseguito.

### Lista delle azioni attualmente disponibili

'atterraggio_pagina' : atterra sulla pagina specificata
args: url

'clicca' : clicca sull'elemento specificato
args: selector

'inserisci_testo' : inserisci il testo specificato nell'elemento specificato
args: selector, text

'controlla' : controlla se l'elemento specificato è visibile
args: selector

Queste sono le azioni attualmente disponibili, ovviamente il progetto è costruito per ospitarne tantissime altre che si potranno sviluppare in futuro

### Esegui `node RUN_ALLURE_REPORT.ts`
Per generare il report di allure ed in seguito aprire la dashboard ed il programma di visualizzazione tracce

### Generazione di reportistica in formato PDF
Dopo l'esecuzione dei test, verrà generata una cartella chiamata 'PDFReports' in cui saranno contenuti i file pdf ordinati per progetto e test, con la reportistica degli step eseguiti

### Generazione di una cartella di backup per i file trace
Dopo l'esecuzione dei test, verrà generata una cartella chiamata 'TracesReport' in cui saranno contenuti tutti i file trace generati dai test

### Esegui `node RUN_TRACE.ts`
Per aprire il programma di visualizzazione tracce, molto utile da utilizzare ad esempio nel caso in cui volessimo rivedere una vecchia tracce presente nella cartella di backup o una presente all'interno della dashboard di Allure

# GRAZIE