import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d67b52f637a294",
    pass: "4de04a4e6b01a6"
  }
});


export class NodemailerMailAdapater implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    from: "Equipe Fidget <oi@fidget.com>",
    to: "Vinícius Wilbert Hack <viniciusvwh1441@gmail.com>",
    subject,
    html: body
  });

  }
}