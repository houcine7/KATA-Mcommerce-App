import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Payment } from '../interfaces/payment.interface';
import { CreatePaymentDTO, mapToEntity } from '../dto/create-payment.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { ORDERS_SERVICE_NAME, OrdersServiceClient } from 'y/common';
import { lastValueFrom } from 'rxjs';

type SVCResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

@Injectable()
export class PaymentService implements OnModuleInit {
  private ordersSVC: OrdersServiceClient;

  constructor(
    @Inject('PAYMENT_MODEL')
    private paymentModel: Model<Payment>,
    @Inject('ORDER_SERVICE')
    private ordersServiceGrpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.ordersSVC =
      this.ordersServiceGrpcClient.getService<OrdersServiceClient>(
        ORDERS_SERVICE_NAME,
      );
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
        createPaymentDTO.orderId,
      );
      if (paymentExists.success) {
        return {
          success: false,
          data: null,
          message: `this payment with orderId=${createPaymentDTO.orderId} is already created !`,
        };
      }

      // now we can save the payment
      const createdPayment = new this.paymentModel({
        ...mapToEntity(createPaymentDTO),
        status: 'paid',
      });

      const savedPayment = await createdPayment.save();
      // set the order status
      const orderStatusChanged = await this.ordersSVC.setOrderStatus({
        orderId: createPaymentDTO.orderId,
        status: 'SUCCESS',
      });

      return {
        success: true,
        data: {
          payment: savedPayment,
          orderStatus: orderStatusChanged,
        },
        message: 'payment created successfully',
      };
    } catch (err) {
      console.log('err', err);
      throw new Error('error while creating payment ...');
    }
  }

  //testing the grpc client
  async test() {
    const res = this.ordersSVC.setOrderStatus({
      orderId: '6544475bec89604270574f5f',
      status: 'FAILED',
    });

    res.subscribe((data) => {
      console.log('data', data);
    });
    const data = await lastValueFrom(res);
    return data;
  }
}
