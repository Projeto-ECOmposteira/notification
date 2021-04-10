import { Request, Response } from "express";

export const sendMail = async (req: Request, res: Response): Promise<void> => {
    res.send("Express + TypeScript Server");
};
