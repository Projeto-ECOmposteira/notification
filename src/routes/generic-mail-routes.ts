import { Router } from "express";
import { sendGenericMail } from "../controllers/generic-mail-controller";

const genericMailRoutes = Router();

genericMailRoutes.post("/send", sendGenericMail);

export default genericMailRoutes;
