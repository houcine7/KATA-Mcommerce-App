import { Module } from '@nestjs/common';
import { PaymentProviders } from './providers/payments.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controller/payment.controller';
import { ORDER_PACKAGE_NAME } from 'y/common';
import { join } from 'path';
import { DatabaseProviders } from '../../database/database.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [PaymentController],
  providers: [...PaymentProviders, PaymentService, ...DatabaseProviders],
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ORDER_PACKAGE_NAME,
          protoPath: join(__dirname, '../order.proto'),
        },
      },
    ]),
  ],
})
export class PaymentModule {}
