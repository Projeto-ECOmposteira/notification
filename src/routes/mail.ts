import { Router } from "express";
import { sendMail } from "../controllers/mail";

const routes = Router();

routes.get("/send", sendMail);

export default routes;
