import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import { CreateProductDTO } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@Inject('Product_MODEL') private productModel: Model<Product>) {}

  // getting all products from the database
  async getAll(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      return products;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't fetch products");
    }
  }

  // getting a product with Id
  async getById(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();
      return product;
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't fetch product");
    }
  }

  // create a product
  async create(product: CreateProductDTO): Promise<Product> {
    try {
      const createdProduct = new this.productModel(product);
      const savedProduct = await createdProduct.save();
      return savedProduct;
    } catch (error) {
      console.log(error);
      throw new Error("Couldn't create product");
    }
  }
}
