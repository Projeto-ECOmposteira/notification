import nodemailer from "nodemailer";
import exphbs from "express-handlebars";
import nodelmailerhbs from "nodemailer-express-handlebars";
import logger from "../utils/logger";
import { resolve } from "path";

const transporter = nodemailer.createTransport({
  host: process.env["SMTP_HOST"],
  port: Number(process.env["SMTP_PORT"]),
  auth: {
    user: process.env["SMTP_EMAIL"],
    pass: process.env["SMTP_PASSWORD"],
  },
});

const viewPath = resolve(__dirname, "..", "views");

transporter.use(
  "compile",
  nodelmailerhbs({
    viewEngine: exphbs.create({
      layoutsDir: resolve(viewPath),
      partialsDir: resolve(viewPath, "partials"),
      defaultLayout: "index",
      extname: ".hbs",
    }),
    viewPath,
    extName: ".hbs",
  })
);

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
