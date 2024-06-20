import { Test, TestingModule } from '@nestjs/testing';
import { UserShoppinglistsController } from './user-shoppinglists.controller';
import { UserShoppingListsService } from './user-shoppinglists.service';

describe('UserShoppinglistsController', () => {
  let controller: UserShoppinglistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserShoppinglistsController],
      providers: [UserShoppingListsService],
    }).compile();

    controller = module.get<UserShoppinglistsController>(UserShoppinglistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
