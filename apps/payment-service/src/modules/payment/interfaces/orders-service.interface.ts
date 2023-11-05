export interface OrderService {
  SetOrderStatus(orderById: { id: string; status: string }): Promise<any>;
}
