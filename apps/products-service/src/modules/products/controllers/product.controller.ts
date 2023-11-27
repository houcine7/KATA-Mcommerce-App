import { Controller, Res, Get, Param, Body, Post } from '@nestjs/common';

import { ProductService } from '../services/product.service';
import { Response } from 'express';
import { CreateProductDTO } from '../dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private productSVC: ProductService) {}

  @Get()
  async fetchAllProducts(@Res() res: Response): Promise<Response> {
    try {
      const products = await this.productSVC.getAll();
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json('Something went wrong!');
    }
  }

  @Get(':id')
  async fetchProductById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const product = await this.productSVC.getById(id);
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json('Something went wrong!');
    }
  }

  @Post()
  async insertProduct(
    @Body() createProductDto: CreateProductDTO,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const product = await this.productSVC.create(createProductDto);
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json('Something went wrong!');
    }
  }
}
