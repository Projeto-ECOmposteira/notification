import loadEnvs from "./utils/secrets";
loadEnvs();

import errorHandler from "errorhandler";
import compression from "compression";
import cors from "cors";
import express from "express";
import lusca from "lusca";
import rateLimit from "express-rate-limit";
import setBaseRouter from "./routes/base-router";

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

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

app.use(limiter);

setBaseRouter(app);

const PORT = process.env["PORT"] || 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
