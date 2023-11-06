import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDTO } from '../dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async insertPayment(@Body() createPaymentDTO: CreatePaymentDTO) {
    return await this.paymentService.createPayment(createPaymentDTO);
  }
  @Get('/test')
  async test() {
    try {
      const res = await this.paymentService.test();

      return {
        res,
        testStatus: 'success',
      };
    } catch (error) {
      return {
        error,
        testStatus: 'failed',
      };
    }
  }
}
