import { Module } from '@nestjs/common';
import { OrderProviders } from './providers/orders.providers';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseProviders } from 'src/database/database.providers';
import { OrdersService } from './services/orders.service';
import { ProductClientService } from './services/productClient.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersGrpcController } from './controllers/orders-grpc.controller';

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
