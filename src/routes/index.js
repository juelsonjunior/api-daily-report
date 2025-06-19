import { Router } from "express";
import User from "./user.js";
import Report from "./dailyReport.js";

const router = Router();

router.use("/", User);
router.use("/", Report);
export default router;
