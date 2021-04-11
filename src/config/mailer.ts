import nodemailer from "nodemailer";
import logger from "../utils/logger";

const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"],
    port: Number(process.env["SMTP_PORT"]),
    auth: {
        user: process.env["SMTP_EMAIL"],
        pass: process.env["SMTP_PASSWORD"]
    }
});

const SMTPConnectionValidatation = (error: Error) => {
  if (error) {
    logger.error("Erro ao configurar credenciais de e-mail");
    logger.error(error);
  } else {
    logger.debug("SMTP connection established");
  }
};

transporter.verify(SMTPConnectionValidatation);

export default transporter;
