import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserShoppingListsService } from './user-shoppinglists.service';
import { UserShoppinglistsController } from './user-shoppinglists.controller';
import { Usershoppinglists } from './entities/user-shoppinglist.entity';
import { UsersModule } from 'src/users/users.module';
import { Shoppinglistproducts } from 'src/shoppinglist-products/entities/shoppinglist-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usershoppinglists, Shoppinglistproducts]),
    UsersModule,
  ],
  controllers: [UserShoppinglistsController],
  providers: [UserShoppingListsService],
  exports: [UserShoppingListsService],
})
export class UserShoppingListsModule {}
