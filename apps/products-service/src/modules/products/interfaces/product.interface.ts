import { Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
