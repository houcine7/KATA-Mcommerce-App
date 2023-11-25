import { Module } from '@nestjs/common';
import { TransportOptions, createTransport } from 'nodemailer';
import {
  EMAIL_CONFIG_TOKEN,
  EMAIL_INSTANCE_TOKEN,
  getEmailConfigToken,
} from './email-service.constants';

import { EmailServiceService } from './email-service.service';
import { ServerConfigModule } from './config/server-config.module';
import { ServerConfigService } from './config/server-config.service';

@Module({
  imports: [ServerConfigModule],
  controllers: [],
  providers: [
    {
      provide: EMAIL_CONFIG_TOKEN,
      useFactory: (config: ServerConfigService) => {
        console.log(config);
        if (config.get('NODE_ENV') === 'test') {
          return { jsonTransport: true };
        }
        return {
          pool: true,
          service: 'gmail',
          host: config.get('SMTP_HOST'),
          auth: {
            user: config.get('NOREPLY_EMAIL'),
            pass: config.get('SMTP_PASS'),
          },
        };
      },
      inject: [ServerConfigService],
    },
    {
      provide: EMAIL_INSTANCE_TOKEN,
      useFactory: (config: TransportOptions) => createTransport(config),
      inject: [getEmailConfigToken()],
    },
    EmailServiceService,
  ],
  exports: [EmailServiceService],
})
export class EmailServiceModule {}
