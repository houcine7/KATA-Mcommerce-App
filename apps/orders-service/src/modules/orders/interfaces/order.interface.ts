import { Document } from 'mongoose';
import { PaymentStatus } from './Payment.enum';

type ProductItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
};
export interface Order extends Document {
  createdAt: Date;
  products: ProductItem[];
  amount: number;
  paymentStatus: PaymentStatus;
}
