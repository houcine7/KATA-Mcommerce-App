import { Connection } from 'mongoose';
import { PaymentSchema } from '../models/payment.schema';

export const PaymentProviders = [
  {
    provide: 'PAYMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Payment', PaymentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
