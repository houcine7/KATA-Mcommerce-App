import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './orders-service.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersServiceModule);
  await app.listen(3000);
}
bootstrap();
