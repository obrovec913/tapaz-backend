import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { IEmailPayload } from './email.interfaces';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  public async sendEmail(payload: IEmailPayload): Promise<void> {

      await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        service: 'gmail',
        auth: {
          user: 'tapazby2020@gmail.com',
          pass: 'mJ23R4RKCks86TD'
        },
        tls: {
          rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
      from: 'tapazby2020@gmail.com',
      to: "tapazby2020@gmail.com",
      subject: "Message from tapaz.by",
      text: "This message was sent from Node js server.",
      html: `Вам пришло обращение.<br>От: ${payload.email}<br>Имя: ${payload.name}<br>Текст: ${payload.text}`
    });
  }
}

