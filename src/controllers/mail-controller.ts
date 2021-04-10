import { Request, Response } from "express";
import MailService from "../services/mail-service";

export const sendMail = async (req: Request, res: Response) => {
  try {
    const response = await new MailService().sendMail();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};
