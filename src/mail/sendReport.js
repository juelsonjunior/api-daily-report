import transporter from "./transporter.js";
import dotenv from "dotenv";
dotenv.config();

export async function sendReportEmail(to, subject, text, filePath) {
  await transporter.sendMail({
    from: `Reatório Semanal ${process.env.EMAIL_GMAIL}`,
    to,
    subject,
    text,
    attachments: filePath
      ? [{ filename: "reportSummaryWeekly.pdf", path: filePath }]
      : [],
  });
}
