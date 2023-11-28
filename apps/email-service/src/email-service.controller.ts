import { Controller } from '@nestjs/common';
import { EmailService } from './email-service.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('rabbit-mq-email')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();

    channel.ack(orginalMessage);
    this.emailService.sendVerificationEmail(
      data.username,
      data.email,
      data.verificationToken,
    );
  }
}
