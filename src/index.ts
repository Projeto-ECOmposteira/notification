import express from "express";
import loadEnvs from "./utils/secrets";

loadEnvs();

const app = express();
const PORT = process.env["PORT"] || 8000;
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
