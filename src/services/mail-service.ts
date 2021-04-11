import transporter from "../config/mailer";

class MailService {
  async sendMail() {
    const info = await transporter.sendMail({
      from: process.env["SMTP_FROM"],
      to: "welison.almeida.923@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

  }
}

export default MailService;
