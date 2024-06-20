import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListProductsController } from './shoppinglist-products.controller';
import { ShoppingListProductsService } from './shoppinglist-products.service';

describe('ShoppinglistProductsController', () => {
  let controller: ShoppingListProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListProductsController],
      providers: [ShoppingListProductsService],
    }).compile();

    controller = module.get<ShoppingListProductsController>(
      ShoppingListProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
