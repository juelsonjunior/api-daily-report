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
export default router;
