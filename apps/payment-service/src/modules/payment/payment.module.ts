import { Module } from '@nestjs/common';
import { PaymentProviders } from './providers/payments.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controller/payment.controller';
import { DatabaseProviders } from 'src/database/database.providers';

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
          package: 'orders',
          protoPath: '../rpc/order.proto',
          url: 'localhost:5000',
        },
      },
    ]),
  ],
})
export class PaymentModule {}
