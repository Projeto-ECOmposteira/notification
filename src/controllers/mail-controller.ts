import { Request, Response } from "express";
import { GenericMail } from "../types/types";
import MailService from "../services/mail-service";

export const sendMail = async (req: Request, res: Response) => {
  try {
    const messageOptions : GenericMail = {
      to: req.body.to,
      subject: req.body.subject,
      user: req.body.user,
      message: req.body.message,
      images: req.body.images,
    };

    const response = await new MailService().sendGenericMail(messageOptions);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};
