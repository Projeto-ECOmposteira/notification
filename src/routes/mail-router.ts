import { Router } from "express";
import { sendMail } from "../controllers/mail-controller";

const routes = Router();

routes.get("/send", sendMail);

export default routes;
