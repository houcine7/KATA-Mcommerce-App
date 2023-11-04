import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database/database.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [DatabaseModule, PaymentModule],
  providers: [],
})
export class AppModule {}
