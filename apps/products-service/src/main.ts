import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log'],
  });

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: '*',
    credentials: true,
  });

  await app.listen(3007);
}
bootstrap();
