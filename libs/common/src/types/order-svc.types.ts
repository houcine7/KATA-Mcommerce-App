/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'order';

export interface SetOrderDto {
  orderId: string;
  status: string;
}

export interface Order {
  id: string;
  products: Product[];
  amount: number;
  paymentStatus: string;
  createdAt: Date | string;
}

export interface Product {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount?: number | undefined;
}

export const ORDER_PACKAGE_NAME = 'order';

export interface OrdersServiceClient {
  setOrderStatus(request: SetOrderDto): Observable<Order | null>;
}

export interface OrdersServiceController {
  setOrderStatus(
    request: SetOrderDto,
  ): Promise<Order | null> | Observable<Order | null> | Order;
}

export function OrdersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['setOrderStatus'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrdersService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('OrdersService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ORDERS_SERVICE_NAME = 'OrdersService';
