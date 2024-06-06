import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppinglistProduct } from './entities/shoppinglist-product.entity';
import { CreateShoppinglistProductDto } from './dto/create-shoppinglist-product.dto';
import { UpdateShoppinglistProductDto } from './dto/update-shoppinglist-product.dto';

@Injectable()
export class ShoppingListProductsService {
  constructor(
    @InjectRepository(ShoppinglistProduct)
    private shoppingListProductsRepository: Repository<ShoppinglistProduct>,
  ) {}

  create(createShoppingListProductDto: CreateShoppinglistProductDto): Promise<ShoppinglistProduct> {
    const shoppingListProduct = this.shoppingListProductsRepository.create(createShoppingListProductDto);
    return this.shoppingListProductsRepository.save(shoppingListProduct);
  }

  findAll(): Promise<ShoppinglistProduct[]> {
    return this.shoppingListProductsRepository.find({ relations: ['shoppinglist', 'product'] });
  }

  findOne(id: number): Promise<ShoppinglistProduct> {
    return this.shoppingListProductsRepository.findOne({ where: { id }, relations: ['shoppinglist', 'product'] });
  }

  async update(id: number, updateShoppingListProductDto: UpdateShoppinglistProductDto): Promise<ShoppinglistProduct> {
    await this.shoppingListProductsRepository.update(id, updateShoppingListProductDto);
    return this.shoppingListProductsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.shoppingListProductsRepository.delete(id);
  }
}
