import loadEnvs from "./utils/secrets";
loadEnvs();

import errorHandler from "errorhandler";
import compression from "compression";
import cors from "cors";
import express from "express";
import lusca from "lusca";
import rateLimit from "express-rate-limit";
import setBaseRouter from "./routes/base-router";
import logger from "./utils/logger";

const app = express();

app.use(compression());
app.use(cors({ origin: process.env["ALLOWED_HOSTS"] }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Limite máximo de requisições ao servidor atingido. Por favor, tente mais tarde.",
});

app.use(limiter);

setBaseRouter(app);

const PORT = process.env["PORT"] || 8003;
app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
