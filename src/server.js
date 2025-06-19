import express from "express";
import Routes from "./routes/index.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(Routes)

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
);
