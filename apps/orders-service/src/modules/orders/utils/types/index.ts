export type CreateOrderResp = {
  data: any;
  message?: string;
  created?: boolean;
  success?: boolean;
};

export type Product = {
  idProduct: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

export type FullOrder = {
  id: string;
  products: Product[];
  amount: number;
  paymentStatus: string;
  discount: number;
};
