import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Order } from '../interfaces/order.interface';
import { OrdersService } from '../services/orders.service';
import { SetOrderStatusMsg } from '../dto/create-order.dto';

@Controller()
export class OrdersGrpcController {
  constructor(private OrdersSVC: OrdersService) {}
  // set payment status
  @GrpcMethod('OrdersService', 'SetOrderStatus')
  async setOrderStatus(data: SetOrderStatusMsg): Promise<Order> {
    console.log('Method invoked from gRPC client');
    try {
      const result = await this.OrdersSVC.setOrderStatus(data);
      if (result.success) {
        return result.data;
      } else {
        throw new Error("couldn't update order status");
      }
    } catch (error) {
      console.log(error);
      throw new Error("couldn't update order status");
    }
  }
}
