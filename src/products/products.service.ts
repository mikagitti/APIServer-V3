import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Shoppinglistproducts } from 'src/shoppinglist-products/entities/shoppinglist-product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Shoppinglistproducts)
    private shoppingListProductsRepository: Repository<Shoppinglistproducts>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const shoppingListProducts = await this.shoppingListProductsRepository.find(
      {
        where: { product: { id } },
      },
    );
    await this.shoppingListProductsRepository.remove(shoppingListProducts);
    await this.productsRepository.delete(id);
  }
}
