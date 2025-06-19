import { Router } from "express";
import User from "./user.js";

const router = Router();

router.use("/", User);

export default router;
