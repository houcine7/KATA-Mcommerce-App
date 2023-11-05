import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from '../interfaces/order.interface';
import { CreateOrderDTO, SetOrderStatusMsg } from '../dto/create-order.dto';
import { ProductClientService } from './productClient.service';

type CreateOrderResp = {
  order: Order;
  message?: string;
  created: boolean;
};

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
    private productClientSVC: ProductClientService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDTO): Promise<CreateOrderResp> {
    try {
      //check if quantity is available in product service
      let calculatedAmount = 0;
      for (let i = 0; i < createOrderDto.products.length; i++) {
        //
        calculatedAmount +=
          createOrderDto.products[i].unitPrice *
          createOrderDto.products[i].quantity;
        const product = createOrderDto.products[i];
        const { validQuantity, message } =
          await this.productClientSVC.checkQuantity(
            product.productId,
            product.quantity,
          );
        if (!validQuantity) {
          return {
            message: message,
            created: false,
            order: null,
          };
        }
      }

      if (calculatedAmount != createOrderDto.amount) {
        return {
          message: 'Amount is not correct',
          order: null,
          created: false,
        };
      }

      const createdOrder = new this.orderModel(createOrderDto);
      const result = await createdOrder.save();
      return {
        order: result,
        created: true,
      };
    } catch (err) {
      console.log('Error in creating order. ....');
      console.log(err);
      return {
        message: 'Error in creating order',
        order: null,
        created: false,
      };
    }
  }

  //get an order by id
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const order = await this.orderModel.findById(orderId).exec();
      return order;
    } catch (err) {
      console.log(err);
      throw new Error("couldn't get order");
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find().exec();
      return orders;
    } catch (err) {
      console.log(err);
      throw new Error("couldn't get orders");
    }
  }

  async setOrderStatus(setOrderStatusDTO: SetOrderStatusMsg): Promise<any> {
    try {
      const updatedModel = this.orderModel.updateOne(
        { id: setOrderStatusDTO.id },
        { status: setOrderStatusDTO.status },
      );
      return {
        success: true,
        data: updatedModel,
        message: 'order status updated successfully',
      };
    } catch (error) {
      throw new Error("couldn't update order status");
    }
  }
}
