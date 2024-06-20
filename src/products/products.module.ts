import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Shoppinglistproducts } from 'src/shoppinglist-products/entities/shoppinglist-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Shoppinglistproducts])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
