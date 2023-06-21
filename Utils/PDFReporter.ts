const PDFDocument = require('pdfkit');
const fs = require('fs-extra');


// const insertStepPDF = (workdirectory, step) => {
//     const doc = new PDFDocument();
//
//     const imagePath = 'test-results/example-Corso-rahul-shetty/test-finished-1.png';
//
// // Dimensioni del documento PDF
//     const docWidth = doc.page.width;
//     const docHeight = doc.page.height;
//
// // Caricamento dell'immagine PNG
//     const image = doc.openImage(imagePath);
//     const image2 = doc.openImage(imagePath);
//
// // Calcolo delle dimensioni dell'immagine per adattarsi al documento
//     const imageWidth = docWidth;
//
//     doc.text('Questo è un esempio di testo nel PDF.', { align: 'center' });
//
// // Inserimento dell'immagine nel documento
//     doc.image(image, { width: imageWidth, x: 0 });
//     doc.image(image, { width: imageWidth, x: 0 });
//
//
//     doc.pipe(fs.createWriteStream('json_configs/img/output.pdf'));
//     doc.end();
// }

class PDFReporter {
     doc;

    constructor() {
        this.doc = new PDFDocument();
    }

     insertStepPDF(imagePath) {
        const docWidth = this.doc.page.width;

        const image = this.doc.openImage(imagePath);
        const imageWidth = docWidth;

        this.doc.text(this.doc.image.name, {align: 'center'});
        this.doc.image(image, {width: imageWidth, x: 0});

    }

     savePDF() {
        this.doc.pipe(fs.createWriteStream('PDFReports/output.pdf'));
        this.doc.end();
    }
}

module.exports = {
    PDFReporter
}

