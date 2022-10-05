import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { EmailService } from '../../../EmailService/email.service';
import { IEmailPayload } from '../../../EmailService/email.interfaces';

@Controller('/email')
export class EmailController {
  constructor(
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendEmail(@Body() payload: IEmailPayload): Promise<void> {
    if (!payload.email || payload.email.length > 200 || payload.email.length < 1) {
      throw new BadRequestException({
        message:
          'No less than 1 symbol and no more than 200 symbols is required for your email or phone number',
      });
    }
    if (!payload.name || payload.name.length > 200 || payload.name.length < 1) {
      throw new BadRequestException({
        message:
          'No less than 1 symbol and no more than 200 symbols is required for your name',
      });
    }
    if (!payload.text || payload.text.length > 1000 || payload.text.length < 1) {
      throw new BadRequestException({
        message:
          'No less than 1 symbol and no more than 1000 symbols is required for your text',
      });
    }
    return this.emailService.sendEmail(payload);
  }
}
