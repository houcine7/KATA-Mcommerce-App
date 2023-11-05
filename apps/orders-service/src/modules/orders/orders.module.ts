import { Module } from '@nestjs/common';
import { OrderProviders } from './providers/orders.providers';

import { OrdersService } from './services/orders.service';
import { ProductClientService } from './services/productClient.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersGrpcController } from './controllers/orders-grpc.controller';
import { DatabaseProviders } from '../../database/database.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [OrdersController, OrdersGrpcController],
  providers: [
    ...OrderProviders,
    ...DatabaseProviders,
    ProductClientService,
    OrdersService,
  ],
  imports: [DatabaseModule],
})
export class OrdersModule {}
