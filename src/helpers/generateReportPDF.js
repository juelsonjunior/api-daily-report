import PDFDocument from "pdfkit";
import fs from "fs";

export default function generateReportPDF(data, filePath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Título principal
      doc
        .fontSize(18)
        .text(" Relatório Semanal", { align: "center" })
        .moveDown();

      // Informações gerais
      doc.fontSize(12).text(` Usuário: ${data.user}`);
      doc.text(` Semana: ${data.week}`);
      doc.text(` Dias reportados: ${data.daysReported}`).moveDown();

      // Relatórios por dia
      data.summary.forEach((dia) => {
        const date = new Date(dia.createAt).toISOString().split("T")[0];
        const day = date.split("-")[2];
        doc
          .fontSize(13)
          .text(
            ` Dia ${day} - ${date}`,
            { underline: true }
          )
          .moveDown(0.5);

        doc.fontSize(11).text(` O que foi feito:`);
        doc.text(dia.whatWasDone || "-", { indent: 20 }).moveDown(0.5);

        doc.text(` O que fará amanhã:`);
        doc.text(dia.whatToDoTomorrow || "-", { indent: 20 }).moveDown(0.5);

        if (dia.blockers) {
          doc.text(` Bloqueios:`);
          doc.text(dia.blockers, { indent: 20 }).moveDown(0.5);
        }

        doc.moveDown();
        doc
          .moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .strokeColor("#cccccc")
          .stroke()
          .moveDown();
      });

      // Finalizar
      doc.end();

      writeStream.on("finish", () => {
        resolve("PDF gerado com sucesso.");
      });

      writeStream.on("error", (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
}
