import cron from "node-cron";
import path from "path";

import getCurrentWeek from "../helpers/getCurrentWeek.js";

import Report from "../models/Report.js";
import User from "../models/User.js";
import { sendReportEmail } from "../mail/sendReport.js";
import generateReportPDF from "../helpers/generateReportPDF.js";

cron.schedule("0 23 * * 0", async () => {
  try {
    const { monday, sunday } = getCurrentWeek();

    const mondayDataClean = monday.toISOString().split("T")[0];
    const sundayDataClean = sunday.toISOString().split("T")[0];

    const users = await User.find();

    for (const user of users) {
      const reportWeek = await Report.find({
        idAuthor: user._id,
        createAt: { $gte: monday, $lt: sunday },
      }).select("-idAuthor -_id -__v");

      const reportSummaryWeekly = {
        user: user.name,
        week: `${mondayDataClean} - ${sundayDataClean}`,
        daysReported: reportWeek.length,
        summary: reportWeek,
      };

      const filePath = path.join(
        process.cwd(),
        "src/reportsWeek",
        `week${mondayDataClean}-${user.name.replace(/\s+/g, "_")}.pdf`
      );

      await generateReportPDF(reportSummaryWeekly, filePath);

      await sendReportEmail(
        user.email,
        "Seu relatório semanal",
        "Segue em anexo",
        filePath
      );
    }
  } catch (error) {
    console.log("Houve um erro ao agendar o cron", error);
  }
});
