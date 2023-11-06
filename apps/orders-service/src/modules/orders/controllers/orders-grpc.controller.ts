import { Controller } from '@nestjs/common';
import { OrdersServiceImp } from '../services/orders.service';
import {
  // ORDER_SERVICE_NAME,
  // Order,
  OrdersServiceController,
  OrdersServiceControllerMethods,
  SetOrderDto,
} from 'y/common';
import { of } from 'rxjs';

// import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@OrdersServiceControllerMethods()
export class OrdersGrpcController implements OrdersServiceController {
  constructor(private OrdersSVC: OrdersServiceImp) {}

  async setOrderStatus(request: SetOrderDto) {
    console.log('Method invoked from gRPC client');
    console.log(request);
    try {
      const result = await this.OrdersSVC.setOrderStatus(request);
      console.log(result.order);
      return result.order;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
