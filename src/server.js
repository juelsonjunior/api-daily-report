import express from "express";
import Routes from "./routes/index.js";
import conectBD from "./database/bd.js";
import "./cron/weeklyReport.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(Routes);

conectBD
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Servidor rodando na porta http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Falha ao conectar com o banco de dados", err);
  });
