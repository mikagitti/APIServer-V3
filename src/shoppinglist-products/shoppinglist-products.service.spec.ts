import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListProductsService } from './shoppinglist-products.service';

describe('ShoppinglistProductsService', () => {
  let service: ShoppingListProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListProductsService],
    }).compile();

    service = module.get<ShoppingListProductsService>(
      ShoppingListProductsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
