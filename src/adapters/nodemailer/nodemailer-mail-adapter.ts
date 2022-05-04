import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "23342dcb9a965d",
    pass: "628aeee5cf8536"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  public async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gustavo T. Bauke <baukegustavo@gmail.com>',
      subject,
      html: body,
    });
  }
}
