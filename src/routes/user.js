import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  res
    .status(200)
    .json(
      `Login feito com o nome ${name} o email ${email} e a senha ${password}`
    );
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(`Precisa preenche todos os campos`);
  }

  const userDuplicated = await User.findOne({ name });

  if (userDuplicated) {
    return res.status(409).json("Esse email já esta em uso");
  }

  const newUser = await User.create({ name, email, password });

  if (!newUser) {
    return res.status(400).json(`Falha ao cadastrar usuario no banco de dados`);
  }
  res.status(201).json(`Usuario cadastrado com sucesso`);
});

export default router;
