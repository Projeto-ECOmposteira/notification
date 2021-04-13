import Mail from "nodemailer/lib/mailer";
import MailService from "./mail-service";
import { getCurrentHourMinute } from "../utils/time";
import { GenericMail } from "../types/types";

class GenericMailService {
  async sendGenericMail(messageOptions: GenericMail) {
    const formattedTime = getCurrentHourMinute();

    let attachments: Array<Mail.Attachment> = [];
    if (messageOptions.images) {
      attachments = await new MailService().base64ImagesToAttachment(messageOptions.images);
    }

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
      attachments: attachments,
    };

    await new MailService().sendMail(mailOptions);
  }
}

export default GenericMailService;
