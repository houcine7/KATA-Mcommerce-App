type ProductItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
};

export class CreateOrderDTO {
  readonly products: ProductItem[];
  readonly createdAt: Date;
  readonly amount: number;
}

export class SetOrderStatusMsg {
  readonly id: string;
  readonly status: string;
}
