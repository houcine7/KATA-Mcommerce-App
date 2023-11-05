import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Payment } from '../interfaces/payment.interface';
import { CreatePaymentDTO } from '../dto/create-payment.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { OrderService } from '../interfaces/orders-service.interface';

type SVCResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

@Injectable()
export class PaymentService implements OnModuleInit {
  private ordersSVC: any;

  constructor(
    @Inject('PAYMENT_MODEL')
    private paymentModel: Model<Payment>,
    @Inject('ORDER_SERVICE')
    private ordersServiceGrpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.ordersSVC =
      this.ordersServiceGrpcClient.getService<OrderService>('OrdersService');

    console.log('this.ordersSVC', this.ordersSVC);
  }

  //
  async findPaymentByOrderId(orderId: string): Promise<SVCResponse> {
    try {
      const paymentFound = await this.paymentModel
        .find({
          orderId: orderId,
        })
        .exec();

      if (paymentFound.length == 0) {
        return {
          success: false,
          data: null,
          message: 'no payment found with the provided orderId',
        };
      }

      return {
        success: true,
        data: paymentFound,
        message: 'fetched successfully',
      };
    } catch (error) {
      throw new Error('error while getting payment');
    }
  }

  async createPayment(
    createPaymentDTO: CreatePaymentDTO,
  ): Promise<SVCResponse> {
    try {
      const paymentExists = await this.findPaymentByOrderId(
        createPaymentDTO.orderID,
      );
      if (paymentExists.success) {
        return {
          success: false,
          data: null,
          message: `this payment with orderId=${createPaymentDTO.orderID} is already created !`,
        };
      }

      // now we can save the payment
      const createdPayment = new this.paymentModel(createPaymentDTO);
      const savedPayment = await createdPayment.save();
      // set the order status
      const orderStatusChanged = this.ordersSVC.SetOrderStatus({
        id: createPaymentDTO.orderID,
        status: 'SUCCESS',
      });

      console.log('orderStatusChanged', orderStatusChanged);

      return {
        success: true,
        data: {
          payment: savedPayment,
          orderStatus: orderStatusChanged,
        },
        message: 'payment created successfully',
      };
    } catch (err) {
      throw new Error('error while creating payment ...');
    }
  }

  //testing the grpc client
  async test() {
    const orderStatusChanged = await this.ordersSVC?.SetOrderStatus({
      id: '65444709ec89604270574f5a',
      status: 'SUCCESS',
    });
    console.log('orderStatusChanged', orderStatusChanged);
    return {
      success: true,
      data: 'testing this route',
    };
  }
}
