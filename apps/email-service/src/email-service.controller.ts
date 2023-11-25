import { Controller } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailServiceService) {}

  @MessagePattern('rabbit-mq-email')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();

    console.log('data', data);

    channel.ack(orginalMessage);
  }
}
