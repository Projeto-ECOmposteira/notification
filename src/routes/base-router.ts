import { Express } from "express";
import mail from "./generic-mail-routes";

const setBaseRouter = (app: Express): void => {
  app.use("/mail", [mail]);
};

export default setBaseRouter;
