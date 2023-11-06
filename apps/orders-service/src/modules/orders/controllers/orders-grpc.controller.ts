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
    console.log('the request', request);
    try {
      const result = await this.OrdersSVC.setOrderStatus(request);
      console.log('THIS IS RESULT', result.data);
      return {
        id: result.data?._id,
        products: result.data?.products,
        amount: result.data?.amount,
        paymentStatus: result.data?.paymentStatus,
        createdAt: result.data?.createdAt,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
