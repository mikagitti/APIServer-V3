import { Test, TestingModule } from '@nestjs/testing';
import { ShoppinglistProductsService } from './shoppinglist-products.service';

describe('ShoppinglistProductsService', () => {
  let service: ShoppinglistProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppinglistProductsService],
    }).compile();

    service = module.get<ShoppinglistProductsService>(ShoppinglistProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
