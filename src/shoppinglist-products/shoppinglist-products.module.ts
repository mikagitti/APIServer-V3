import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListProductsService } from './shoppinglist-products.service';
import { ShoppingListProductsController } from './shoppinglist-products.controller';
import { ShoppinglistProduct } from './entities/shoppinglist-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppinglistProduct])],
  controllers: [ShoppingListProductsController],
  providers: [ShoppingListProductsService],
  exports: [ShoppingListProductsService],
})
export class ShoppingListProductsModule {}

