import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  res
    .status(200)
    .json(
      `Login feito com o nome ${name} o email ${email} e a senha ${password}`
    );
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res
    .status(200)
    .json(
      `Cadastro feito com o nome ${name} o email ${email} e a senha ${password}`
    );
});

export default router;
