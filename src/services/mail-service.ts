import Mail from "nodemailer/lib/mailer";
import logger from "../utils/logger";
import transporter from "../config/mailer";
import { Base64Image, GenericMail } from "types";
import { getCurrentHourMinute } from "../utils/time";

class MailService {
  async base64ImagesToAttachment(images: Array<Base64Image>) {
    const attachments: Array<Mail.Attachment> = [];

    images.forEach((image: Base64Image) => {
      const attachment: Mail.Attachment = {
        filename: image.filename,
        contentType: image.base64Image.substring(
          image.base64Image.indexOf(":") + 1,
          image.base64Image.indexOf(";")
        ),
        content: Buffer.from(image.base64Image.split("base64,")[1], "base64"),
      };

      attachments.push(attachment);
    });

    return attachments;
  }

  async sendGenericMail(messageOptions: GenericMail) {
    const formattedTime = getCurrentHourMinute();

    let attachments: Array<Mail.Attachment> = [];
    if (messageOptions.images) {
      attachments = await this.base64ImagesToAttachment(messageOptions.images);
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

    await this.sendMail(mailOptions);
  }

  async sendMail(mailOptions: Mail.Options) {
    const mailResponse = await transporter.sendMail(mailOptions);

    logger.info(mailResponse);
  }
}

export default MailService;
