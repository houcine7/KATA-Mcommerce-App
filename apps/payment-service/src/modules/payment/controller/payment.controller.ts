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
    await this.paymentService.test();
    return {
      success: true,
      data: 'testing this route',
    };
  }
}
