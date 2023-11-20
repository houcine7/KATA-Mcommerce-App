import { Module } from '@nestjs/common';
import { ProductProviders } from './providers/products.providers';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [ProductController],
  providers: [...ProductProviders, ProductService],
  imports: [DatabaseModule],
})
export class ProductsModule {}
