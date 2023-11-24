import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { OrdersServiceImp } from '../services/orders.service';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  //
  constructor(private OrdersSVC: OrdersServiceImp) {}

  @Post()
  async create(
    @Body() createOrderDTO: CreateOrderDTO,
    @Res() res: Response,
  ): Promise<Response> {
    //
    try {
      // console.log('createOrderDTO', createOrderDTO);
      const result = await this.OrdersSVC.createOrder(createOrderDTO);
      if (!result.created) {
        return res.status(HttpStatus.BAD_REQUEST).json(result.message);
      }
      return res.status(HttpStatus.OK).json(result);
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

  @Get(':id/full-object')
  async getFullOrderDetails(@Param('id') id_order, @Res() res: Response) {
    const ans = await this.OrdersSVC.getOrdersFull(id_order);
    return res.status(200).json(ans);
  }
}
