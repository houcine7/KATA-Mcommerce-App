import { NestFactory } from '@nestjs/core';
import { EmailServiceModule } from './email-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'email_queue',
        prefetchCount: 1,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
