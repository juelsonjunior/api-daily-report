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
    const decoded = jwt.verify(tokenClean, JWTSECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ message: `Falha no middlware de autenticação` });
    console.log(error);
  }
};

export default privateRoute;
