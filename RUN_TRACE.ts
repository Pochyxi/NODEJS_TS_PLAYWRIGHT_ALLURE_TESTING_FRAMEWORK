const {executeCommand} = require('./Utils/TestAndReport.ts')
const {PDFReporter} = require('./Utils/PDFReporter.ts')


// executeCommand("npx playwright show-trace")

let nuovoPDF = new PDFReporter()
nuovoPDF.insertStepPDF('test-results/example-Corso-rahul-shetty/test-finished-1.png')
nuovoPDF.insertStepPDF('test-results/example-Corso-rahul-shetty/test-finished-1.png')
nuovoPDF.insertStepPDF('test-results/example-Corso-rahul-shetty/test-finished-1.png')
nuovoPDF.insertStepPDF('test-results/example-Corso-rahul-shetty/test-finished-1.png')
nuovoPDF.insertStepPDF('test-results/example-Corso-rahul-shetty/test-finished-1.png')
nuovoPDF.savePDF()
