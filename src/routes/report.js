import { Router } from "express";
import Report from "../models/Report.js";
import getQueryDateRange from "../helpers/getQueryDateRange.js";
import getCurrentWeek from "../helpers/getCurrentWeek.js";
const router = Router();

router.post("/reports", async (req, res) => {
  const { whatWasDone, whatToDoTomorrow, blockers } = req.body;

  try {
    if (!whatWasDone || !whatToDoTomorrow) {
      return res
        .status(400)
        .json({ message: "Precisa preencher todos os campos" });
    }

    const reportDuplicated = await Report.findOne({
      whatWasDone,
      whatToDoTomorrow,
      blockers,
    });

    if (reportDuplicated) {
      return res
        .status(409)
        .json({ message: "Esse relatório já foi cadastrado" });
    }

    const newReport = await Report.create({
      idAuthor: req.user.id,
      whatWasDone,
      whatToDoTomorrow,
      blockers,
    });

    if (!newReport) {
      return res
        .status(400)
        .json({ message: "Falha ao cadastrar relatório no banco de dados" });
    }

    res.status(201).json({ message: "Relatório cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
    console.log(error);
  }
});

router.get("/reports", async (req, res) => {
  const { from, to } = req.query;

  try {
    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "Precisa informar o intervalo de busca" });
    }

    if (from > to) {
      return res
        .status(400)
        .json({ message: "A data inicial não pode ser maior que a final" });
    }

    const { startdata, endData } = getQueryDateRange(from, to);

    const filterData = await Report.find({
      idAuthor: req.user.id,
      createAt: { $gte: startdata, $lt: endData },
    }).select("-idAuthor -_id -__v");

    if (!filterData) {
      return res.json("Nenhum relatório foi feito nesse intervalo");
    }

    res.status(200).json(filterData);
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
    console.log(error);
  }
});

router.get("/reports/summary/weekly", async (req, res) => {
  const { format } = req.query;

  if (format) {
    return res.status(200).json(`Relatorio gerado no formato ${format}`);
  }

  const { monday, sunday } = getCurrentWeek();

  const mondayDataClean = monday.toISOString().split("T")[0];
  const sundayDataClean = sunday.toISOString().split("T")[0];

  const reportWeek = await Report.find({
    idAuthor: req.user.id,
    createAt: { $gte: monday, $lt: sunday },
  }).select("-idAuthor -_id -__v");

  const reportSummaryWeekly = {
    user: req.user.name,
    week: `${mondayDataClean} - ${sundayDataClean}`,
    daysReported: reportWeek.length,
    summary: reportWeek,
  };

  res.status(200).json(reportSummaryWeekly);
});

export default router;
