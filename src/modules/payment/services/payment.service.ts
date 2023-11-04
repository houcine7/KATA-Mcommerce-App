import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Payment } from '../interfaces/payment.interface';
import { CreatePaymentDTO } from '../dto/create-payment.dto';

type SVCResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_MODEL')
    private paymentModel: Model<Payment>,
  ) {}

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

      // now we can save the order
      const createdPayment = new this.paymentModel(createPaymentDTO);
      const savedPayment = createdPayment.save();
      return {
        success: true,
        data: savedPayment,
        message: 'payment created successfully',
      };
    } catch (err) {
      throw new Error('error while creating payment ...');
    }
  }
}
