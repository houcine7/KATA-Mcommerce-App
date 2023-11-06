import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { AppConfig } from './config/app.config';
import { join } from 'path';
import { ORDER_PACKAGE_NAME } from 'y/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['error', 'log'],
  // });

  // app.connectMicroservice<MicroserviceOptions>({

  // });
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

  // await app.listen(AppConfig.port, () => {
  //   console.log(join(__dirname, '../order.proto'));
  //   //console.log(app.getMicroservices());
  // });
}
bootstrap();
