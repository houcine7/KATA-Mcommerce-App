import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { InjectEmailTransport } from './email-service.decorators';
import { verificationEmail } from './email-service.constants';
import { ServerConfigService } from './config/server-config.service';

@Injectable()
export class EmailServiceService {
  constructor(
    @InjectEmailTransport() private readonly transport: Transporter,
    private readonly configService: ServerConfigService,
  ) {}

  async sendVerificationEmail(
    username: string,
    email: string,
    verificationToken: string,
  ): Promise<void> {
    await this.transport.sendMail({
      from: this.configService.get('NOREPLY_EMAIL'),
      subject: 'Payment validation',
      to: email,
      html: verificationEmail(
        username,
        verificationToken,
        this.configService.get('CORS'),
      ),
    });
  }
}
