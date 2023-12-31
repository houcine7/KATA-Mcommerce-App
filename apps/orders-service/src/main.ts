import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { AppConfig } from './config/app.config';
import { join } from 'path';
import { ORDER_PACKAGE_NAME } from 'y/common';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app0 = await NestFactory.create(AppModule, {
    logger: ['error', 'log'],
    cors: {
      origin: AppConfig.corsOrigin,
    },
  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ORDER_PACKAGE_NAME,
        // eslint-disable-next-line prettier/prettier
        protoPath: join(__dirname, '../order.proto'),
      },
    },
  );
  await app.listen();

  await app0.listen(AppConfig.port, () => {
    console.log('REST api is listening on port', AppConfig.port);
  });
}
bootstrap();
