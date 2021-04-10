import { Express } from "express";
import mail from "./mail";

const setBaseRoutes = (app: Express): void => {
  app.use("/mail", [mail]);
};

export default setBaseRoutes;
