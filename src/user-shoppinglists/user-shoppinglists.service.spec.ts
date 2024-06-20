import { Test, TestingModule } from '@nestjs/testing';
import { UserShoppingListsService } from './user-shoppinglists.service';

describe('UserShoppinglistsService', () => {
  let service: UserShoppingListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserShoppingListsService],
    }).compile();

    service = module.get<UserShoppingListsService>(UserShoppingListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
