import { Request, Response } from "express";
import { GenericMail } from "../types/types";
import GenericMailService from "../services/generic-mail-service";

export const sendGenericMail = async (req: Request, res: Response) => {
  try {
    const messageOptions : GenericMail = {
      to: req.body.to,
      subject: req.body.subject,
      user: req.body.user,
      message: req.body.message,
      images: req.body.images,
    };

    const response = await new GenericMailService().sendGenericMail(messageOptions);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};
