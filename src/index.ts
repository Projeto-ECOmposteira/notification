import errorHandler from "errorhandler";
import compression from "compression";
import cors from "cors";
import express from "express";
import lusca from "lusca";

import loadEnvs from "./utils/secrets";

loadEnvs();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

app.get("/", (req, res) => res.send("Express + TypeScript Server"));

const PORT = process.env["PORT"] || 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
