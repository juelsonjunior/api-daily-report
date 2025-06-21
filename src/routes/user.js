import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

const router = Router();
dotenv.config();
const JWTSECRET = process.env.JWTSECRET;

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

    const token = jwt.sign({ id: user._id, name: user.name }, JWTSECRET, {
      expiresIn: "1d",
    });

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
