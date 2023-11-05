export class CreatePaymentDTO {
  orderID: string;
  price: number;
  currency: string;
  method: string;
  createdAt?: Date;
}
