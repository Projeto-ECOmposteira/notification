import { Express } from "express";
import mail from "./mail-router";

const setBaseRouter = (app: Express): void => {
  app.use("/mail", [mail]);
};

export default setBaseRouter;
