import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ShoppingListProductsService } from './shoppinglist-products.service';
import { CreateShoppinglistProductDto } from './dto/create-shoppinglist-product.dto';
import { UpdateShoppinglistProductDto } from './dto/update-shoppinglist-product.dto';
import { Shoppinglistproducts } from './entities/shoppinglist-product.entity';

export type shoppingListProductsType = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
};

@Controller('shoppinglist-products')
export class ShoppingListProductsController {
  constructor(
    private readonly shoppingListProductsService: ShoppingListProductsService,
  ) {}

  @Post()
  async create(
    @Body() createShoppingListProductDto: CreateShoppinglistProductDto,
  ): Promise<Shoppinglistproducts> {
    return await this.shoppingListProductsService.create(
      createShoppingListProductDto,
    );
  }

  @Get()
  findAll(): Promise<Shoppinglistproducts[]> {
    return this.shoppingListProductsService.findAll();
  }

  @Get('shoppinglistproducts/:id')
  async findOne(@Param('id') id: string): Promise<shoppingListProductsType[]> {
    return await this.shoppingListProductsService.getAllShoppingListProducts(
      +id,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingListProductDto: UpdateShoppinglistProductDto,
  ): Promise<Shoppinglistproducts> {
    return this.shoppingListProductsService.update(
      updateShoppingListProductDto,
    );
  }

  @Delete(':shoppingListId/product/:productId')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 status code
  async removeProductFromShoppingList(
    @Param('shoppingListId') shoppingListId: number,
    @Param('productId') productId: number,
  ): Promise<void> {
    await this.shoppingListProductsService.removeProductFromShoppingList(
      +shoppingListId,
      +productId,
    );
  }
}
