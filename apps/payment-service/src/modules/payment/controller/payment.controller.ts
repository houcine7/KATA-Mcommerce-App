import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDTO } from '../dto/create-payment.dto';
import { RabbitmqEmailService } from '../services/rabbitmq-email.service';

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private rabbitmqEmailSvc: RabbitmqEmailService,
  ) {}

  @Post()
  async insertPayment(@Body() createPaymentDTO: CreatePaymentDTO) {
    this.rabbitmqEmailSvc.sendVerificationEmail({
      pattern: 'rabbit-mq-email',
      data: {
        username: 'houcine7',
        email: 'houssainadl123@gmail.com',
        verificationToken:
          'HEHEHEPAIOEAPIUEkjkzajeuziehPAEIAZEAZEUAPAKEJAKEHUIA',
      },
    });
    await this.paymentService.createPayment(createPaymentDTO);
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
