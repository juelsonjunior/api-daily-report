import { Router } from "express";

const router = Router();

router.post("/reports", (req, res) => {
  const { date, whatWasDone, whatToDoTomorrow, blockers } = req.body;

  res.status(200).json({
    date,
    whatWasDone,
    whatToDoTomorrow,
    blockers,
  });
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
