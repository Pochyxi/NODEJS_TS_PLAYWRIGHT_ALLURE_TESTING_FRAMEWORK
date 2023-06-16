const PDFDocument = require('pdfkit');
const fs = require('fs');

const stepGenerator = () => {

}

const doc = new PDFDocument();

const imagePath = 'test-results/example-Corso-rahul-shetty/test-finished-1.png';

// Dimensioni del documento PDF
const docWidth = doc.page.width;
const docHeight = doc.page.height;

// Caricamento dell'immagine PNG
const image = doc.openImage(imagePath);

// Calcolo delle dimensioni dell'immagine per adattarsi al documento
const imageWidth = docWidth;
const imageHeight = (imageWidth * image.height) / image.width;

// Posizionamento dell'immagine nel documento
const x = 0;
const y = (docHeight - imageHeight) / 2;

doc.text('Questo è un esempio di testo nel PDF.', { align: 'center' });

// Inserimento dell'immagine nel documento
doc.image(image, x, y, { width: imageWidth, height: imageHeight });


doc.pipe(fs.createWriteStream('output.pdf'));
doc.end();