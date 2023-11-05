import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  //   customerID: String,
  products: [
    {
      productId: String,
      quantity: Number,
      unitPrice: Number,
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    default: 'PENDING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
