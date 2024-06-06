import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserShoppingListsService } from './user-shoppinglists.service';
import { UserShoppinglistsController } from './user-shoppinglists.controller';
import { UserShoppingList } from './entities/user-shoppinglist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserShoppingList])],
  controllers: [UserShoppinglistsController],
  providers: [UserShoppingListsService],
  exports: [UserShoppingListsService],
})
export class UserShoppingListsModule {}

