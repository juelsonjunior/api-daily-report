import { Router } from "express";
import User from "./user.js";
import Report from "./report.js";
import privateRoute from "../middleware/privateRoute.js";

const router = Router();

router.use("/", User);
router.use("/", privateRoute, Report);
export default router;
