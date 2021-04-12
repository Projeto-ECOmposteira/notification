import logger from "../utils/logger";
import transporter from "../config/mailer";
import Mail from "nodemailer/lib/mailer";

class MailService {
  async sendGenericMail() {
    const mailOptions = {
      to: "welison.almeida.923@gmail.com",
      from: process.env["SMTP_FROM"],
      subject: "Contato: Lorem ipsum dolor sit amet",
      template: "index",
      context: {
        preheader: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        partialName: "generic-message",
        content: {
          user: "José Maurício",
          time: "20h20",
          message:
            "Prezados, nossa equipe comparecerá ao supermercado Dona de Casa no dia 08/03/2021 às 10h30 para realizar a coleta do material gerado pelas composteiras.Caso tenha alguma dúvida ou não seja possível realizar a coleta dos materiais nesse dia e horário, por favor, entre em contato conosco.",
        },
      },
    };

    await this.sendMail(mailOptions);
  }

  async sendMail(mailOptions: Mail.Options) {
    const mailResponse = await transporter.sendMail(mailOptions);

    logger.info(mailResponse);
  }
}

export default MailService;
