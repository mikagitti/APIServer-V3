import { Test, TestingModule } from '@nestjs/testing';
import { ShoppinglistProductsController } from './shoppinglist-products.controller';
import { ShoppinglistProductsService } from './shoppinglist-products.service';

describe('ShoppinglistProductsController', () => {
  let controller: ShoppinglistProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppinglistProductsController],
      providers: [ShoppinglistProductsService],
    }).compile();

    controller = module.get<ShoppinglistProductsController>(ShoppinglistProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
