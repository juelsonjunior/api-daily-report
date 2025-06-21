import { Router } from "express";
import Report from "../models/Report.js";
const router = Router();

router.post("/reports", async (req, res) => {
  const { whatWasDone, whatToDoTomorrow, blockers } = req.body;

  if (!whatWasDone || !whatToDoTomorrow || !blockers) {
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
});

router.get("/reports", (req, res) => {
  const { from, to } = req.query;

  res.status(200).json(`Relatorio de ${from} a ${to}`);
});

router.get("/reports/summary/weekly", (req, res) => {
  const { format } = req.query;

  if (format) {
    return res.status(200).json(`Relatorio gerado no formato ${format}`);
  }

  res.status(200).json("Relatorio semanal gerado com sucesso");
});

export default router;
