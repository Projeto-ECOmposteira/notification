import Mail from "nodemailer/lib/mailer";
import logger from "../utils/logger";
import transporter from "../config/mailer";
import { GenericMail } from "types";
import { getCurrentHourMinute } from "../utils/time";

class MailService {
  async sendGenericMail(messageOptions: GenericMail) {
    const formattedTime = getCurrentHourMinute();

    const mailOptions = {
      to: messageOptions.to,
      from: process.env["SMTP_FROM"],
      subject: messageOptions.subject,
      template: "index",
      context: {
        preheader: messageOptions.message.substring(0, 100),
        partialName: "generic-message",
        content: {
          user: messageOptions.user,
          time: formattedTime,
          message: messageOptions.message,
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
