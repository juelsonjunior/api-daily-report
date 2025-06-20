import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWTSECRET = process.env.JWTSECRET;

const privateRoute = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res
        .status(400)
        .json({ message: "Token inválido. Forneça um token válido" });
    }

    const tokenClean = token.split(" ")[1];
    const verifyToken = jwt.verify(tokenClean, JWTSECRET);

    if (!verifyToken) {
      return res.status(400).json({
        message: "Você não tem acesso a essa area.Por favor faça login!",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: `Falha no middlware` });
    console.log(error);
  }
};

export default privateRoute;
