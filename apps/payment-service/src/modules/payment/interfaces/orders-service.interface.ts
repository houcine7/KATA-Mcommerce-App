import { Observable } from 'rxjs';
import { Order, SetOrderDto } from 'y/common';

export interface OrderService {
  setOrderStatus(setOrderDto: SetOrderDto): Observable<Order>;
}
