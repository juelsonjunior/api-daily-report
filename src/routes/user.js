import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = Router();
const JWTSECRET =
  "e02bec5bcdba3ca747227627852375ca068d2e3722043471bef14d4afe4e1ca9";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Senha incorrecta. Tente novamente!" });
    }

    const token = jwt.sign({ id: user._id }, JWTSECRET, { expiresIn: "1m" });

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor", error });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Precisa preencher todos os campos" });
    }

    const userDuplicated = await User.findOne({ name });

    if (userDuplicated) {
      return res.status(409).json({ message: "Este email já esta em uso" });
    }

    const hasPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hasPassword,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ message: "Falha ao cadastrar usuario no banco de dados" });
    }
    res.status(201).json({ message: "Usuario cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor", error });
  }
});

export default router;
