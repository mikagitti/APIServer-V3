import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListProductsService } from './shoppinglist-products.service';
import { ShoppingListProductsController } from './shoppinglist-products.controller';
import { Shoppinglistproducts } from './entities/shoppinglist-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { Usershoppinglists } from 'src/user-shoppinglists/entities/user-shoppinglist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shoppinglistproducts,
      Product,
      Usershoppinglists,
    ]),
  ],
  controllers: [ShoppingListProductsController],
  providers: [ShoppingListProductsService],
  exports: [ShoppingListProductsService],
})
export class ShoppingListProductsModule {}
