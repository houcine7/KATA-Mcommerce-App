import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppConfig } from './config/app.config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'orders',
      // eslint-disable-next-line prettier/prettier
      protoPath: join(__dirname, '../rpc/order.proto'),
      url: 'localhost:5000',
    },
  });

  await app.listen(AppConfig.port, () => {
    console.log(join(__dirname, '../rpc/order.proto'));

    //console.log(app.getMicroservices());
  });
}
bootstrap();
