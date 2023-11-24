export class CreatePaymentDTO {
  orderId: string;
  price: number;
  userId: string;
  cardDetails: {
    cardNumber: string;
    cardHolder: string;
    creditExpiry: string;
    cardCvc: string;
  };
}

export function mapToEntity(dto: CreatePaymentDTO) {
  return {
    orderId: dto.orderId,
    price: dto.price,
    status: 'pending',
    createdAt: new Date(),
    userId: dto.userId,
    cardDetails: dto.cardDetails,
  };
}
