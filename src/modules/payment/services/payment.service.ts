import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Payment } from '../interfaces/payment.interface';

type SVCResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_MODE')
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
}
