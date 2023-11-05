import { Observable } from 'rxjs';

export class SetOrderDto {
  orderId: string;
  status: string;
}

export interface Order {
  id: string;
  products: Product[];
  amount: number;
  paymentStatus: string;
}

export interface Product {
  productId: string;
  discount?: string;
  unitPrice: number;
  quantity: number;
}

export interface OrdersService {
  setOrderStatus(setOrderDto: SetOrderDto): Observable<Order>;
}
