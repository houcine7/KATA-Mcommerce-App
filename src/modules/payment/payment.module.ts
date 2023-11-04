import { Module } from '@nestjs/common';
import { PaymentProviders } from './providers/payments.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [...PaymentProviders],
  imports: [DatabaseModule],
})
export class PaymentModule {}
