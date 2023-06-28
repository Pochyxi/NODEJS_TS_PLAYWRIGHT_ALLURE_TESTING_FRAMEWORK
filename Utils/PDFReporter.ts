const PDFDocument = require('pdfkit');
const fs = require('fs-extra');
const path = require('path');

class PDFReporter {
    private doc;
    private stepCount = 0

    constructor() {
        this.doc = new PDFDocument();
        this.stepCount++
    }

    addHeader(testName, projectName, data, ora) {

        this.doc.fontSize(20);
        this.doc.font('Helvetica-Bold');

        this.doc.text(testName, { align: 'center' });
        this.doc.moveDown(2);
        this.doc.fontSize(16);
        this.doc.text("Progetto: " + projectName, { align: 'start' });
        this.doc.text("Del: " + data, { align: 'start' });
        this.doc.text("Ore: " + ora, { align: 'start' });

        this.doc.moveDown(5);

    }

    insertStepPDF(imagePath, stepName) {
        if (this.stepCount > 1) {
            this.doc.addPage();
        }

        const docWidth = this.doc.page.width;
        const image = this.doc.openImage(imagePath);
        const imageWidth = docWidth;

        this.doc.fontSize(14);
        this.doc.fillColor('#000080');

        this.doc.text("STEP |" + this.stepCount + "|", { align: 'center' });
        this.doc.text(stepName, { align: 'start' });
        this.doc.moveDown(1);
        this.doc.image(image, { width: imageWidth, x: 0 });

        this.doc.moveDown(4);

        this.stepCount++
    }

    async savePDF(filename) {
        const pdfFolderPath = path.join(__dirname, '../PDFReports');
        const imgFolderPath = path.join(pdfFolderPath, 'img'); // Path per la cartella img
        const filePath = path.join(pdfFolderPath, `${filename}.pdf`);

        // Crea la cartella di destinazione
        await fs.promises.mkdir(pdfFolderPath, { recursive: true });

        // Salva il file PDF
        await new Promise((resolve, reject) => {
            const stream = this.doc.pipe(fs.createWriteStream(filePath));
            stream.on('finish', resolve);
            stream.on('error', reject);
            this.doc.end();
        });

        // Sposta il file PDF nella cartella di destinazione
        const [name, project, date, time] = filename.split('__');
        const [year, month, day] = date.split('_');
        const targetFolderPath = path.join(pdfFolderPath, name + "__" + project, year, month, day);
        const targetFilePath = path.join(targetFolderPath, `${filename}.pdf`);

        await fs.promises.mkdir(targetFolderPath, { recursive: true });
        await fs.promises.rename(filePath, targetFilePath);

        console.log('File spostato correttamente.');

        // Svuota la cartella img
        const files = await fs.promises.readdir(imgFolderPath);
        for (const file of files) {
            await fs.promises.unlink(path.join(imgFolderPath, file));
        }

        console.log('Cartella img svuotata.');
    }
}

module.exports = {
    PDFReporter
}

