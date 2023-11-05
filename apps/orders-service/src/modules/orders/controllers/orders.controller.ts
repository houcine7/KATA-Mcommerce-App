import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  //
  constructor(private OrdersSVC: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDTO: CreateOrderDTO,
    @Res() res: Response,
  ): Promise<Response> {
    //
    try {
      const result = await this.OrdersSVC.createOrder(createOrderDTO);
      if (!result.created) {
        return res.status(HttpStatus.BAD_REQUEST).json(result.message);
      }
      return res.status(HttpStatus.OK).json(result.order);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json('Error creating order');
    }
  }

  @Get(':id')
  async getOrder(
    @Res() res: Response,
    @Param('id') idProduct: string,
  ): Promise<Response> {
    //
    try {
      const result = await this.OrdersSVC.getOrderById(idProduct);
      if (!result) {
        return res.status(HttpStatus.BAD_REQUEST).json('Order not found');
      }
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json('Error getting order');
    }
  }

  //TODO: should be exposed only for admin
  @Get()
  async getAllOrders(@Res() res: Response): Promise<Response> {
    //
    try {
      const result = await this.OrdersSVC.getAllOrders();
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json('Error getting orders');
    }
  }
}
