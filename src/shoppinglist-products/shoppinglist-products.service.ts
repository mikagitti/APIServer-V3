import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shoppinglistproducts } from './entities/shoppinglist-product.entity';
import { CreateShoppinglistProductDto } from './dto/create-shoppinglist-product.dto';
import { UpdateShoppinglistProductDto } from './dto/update-shoppinglist-product.dto';
import { shoppingListProductsType } from './shoppinglist-products.controller';
import { Product } from 'src/products/entities/product.entity';
import { Usershoppinglists } from 'src/user-shoppinglists/entities/user-shoppinglist.entity';

@Injectable()
export class ShoppingListProductsService {
  constructor(
    @InjectRepository(Shoppinglistproducts)
    private shoppingListProductsRepository: Repository<Shoppinglistproducts>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Usershoppinglists)
    private usershoppinglistsRepository: Repository<Usershoppinglists>,
  ) {}

  ///////////////////////////////////////////////
  /// Create/Add products to shopping list
  ///////////////////////////////////////////////
  async create(createShoppinglistProductDto: CreateShoppinglistProductDto) {
    const { is_checked, shoppinglist_id, product_id } =
      createShoppinglistProductDto;

    const existingEntry = await this.shoppingListProductsRepository.findOne({
      where: {
        shoppinglist: { id: shoppinglist_id },
        product: { id: product_id },
      },
    });

    if (existingEntry) {
      console.log(
        `Product with ID ${product_id} already exists on shopping list with ID ${shoppinglist_id}`,
      );
      throw new NotFoundException(`Product already exists on shopping list`);
    }

    const shoppinglist = await this.usershoppinglistsRepository.findOne({
      where: { id: shoppinglist_id },
      relations: ['shoppingListProducts'],
    });
    if (!shoppinglist) {
      throw new NotFoundException(
        `Shopping list with ID ${shoppinglist_id} not found`,
      );
    }

    const product = await this.productsRepository.findOne({
      where: { id: product_id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }

    const shoppingListProduct =
      await this.shoppingListProductsRepository.create({
        is_checked,
        shoppinglist,
        product,
      });

    return await this.shoppingListProductsRepository.save(shoppingListProduct);
  }

  ///////////////////////////////////////////////
  /// Get all shopping list products
  ///////////////////////////////////////////////
  async findAll(): Promise<Shoppinglistproducts[]> {
    return await this.shoppingListProductsRepository.find({
      relations: ['shoppinglist', 'product'],
    });
  }

  ///////////////////////////////////////////////
  /// Get all shopping list products by shopping list id
  ///////////////////////////////////////////////
  async getAllShoppingListProducts(
    id: number,
  ): Promise<shoppingListProductsType[]> {
    const shoppingList = await this.shoppingListProductsRepository.find({
      where: { shoppinglist: { id: id } },
      relations: ['product'],
    });
    return await this.makeShoppingListProductsArray(shoppingList);
  }

  private makeShoppingListProductsArray(
    shoppinglistProducts: Shoppinglistproducts[],
  ): shoppingListProductsType[] {
    const products: shoppingListProductsType[] = shoppinglistProducts.map(
      (x) => ({
        id: x.product.id,
        name: x.product.name,
        description: x.product.description,
        checked: x.is_checked,
      }),
    );
    return products;
  }

  ///////////////////////////////////////////////
  /// Update shopping list products
  ///////////////////////////////////////////////
  async update(
    updateShoppingListProductDto: UpdateShoppinglistProductDto,
  ): Promise<Shoppinglistproducts> {
    const shoppinglist_id = +updateShoppingListProductDto.shoppinglist_id;
    const product_id = +updateShoppingListProductDto.product_id;
    const is_checked =
      updateShoppingListProductDto.is_checked.toString() === 'true';

    const shoppingListProduct =
      await this.shoppingListProductsRepository.findOne({
        where: {
          shoppinglist: { id: shoppinglist_id },
          product: { id: product_id },
        },
        relations: ['product', 'shoppinglist'],
      });

    if (shoppingListProduct === undefined || shoppingListProduct === null) {
      throw new NotFoundException('Shopping list product not found');
    }

    shoppingListProduct.is_checked = is_checked;

    await this.shoppingListProductsRepository.save(shoppingListProduct);
    return shoppingListProduct;
  }

  ///////////////////////////////////////////////
  /// Remove shopping list products
  ///////////////////////////////////////////////
  async removeProductFromShoppingList(
    shoppingListId: number,
    productId: number,
  ) {
    const shoppingListProduct =
      await this.shoppingListProductsRepository.findOne({
        where: {
          shoppinglist: { id: shoppingListId },
          product: { id: productId },
        },
      });

    await this.shoppingListProductsRepository.delete(shoppingListProduct.id);
  }
}
