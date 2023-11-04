import { Document } from 'mongoose';

export interface Payment extends Document {
  readonly orderId: string;
  readonly price: number;
  readonly currency: string;
  readonly method: string;
  readonly status: string;
  readonly createdAt: Date;
}
