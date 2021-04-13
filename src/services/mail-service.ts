import Mail from "nodemailer/lib/mailer";
import logger from "../utils/logger";
import transporter from "../config/mailer";
import { Base64Image } from "../types/types";

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

  async sendMail(mailOptions: Mail.Options) {
    const mailResponse = await transporter.sendMail(mailOptions);

    logger.info(mailResponse);
  }
}

export default MailService;
