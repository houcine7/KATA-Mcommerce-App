import { Schema } from 'mongoose';

export const PaymentSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  cardDetails: {
    cardNumber: {
      type: String,
      required: true,
    },
    cardHolder: {
      type: String,
      required: true,
    },
    creditExpiry: {
      type: String,
      required: true,
    },
    cardCvc: {
      type: String,
      required: true,
    },
  },
});
