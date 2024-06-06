import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingListProductsService } from './shoppinglist-products.service';
import { CreateShoppinglistProductDto } from './dto/create-shoppinglist-product.dto';
import { UpdateShoppinglistProductDto } from './dto/update-shoppinglist-product.dto';
import { ShoppinglistProduct } from './entities/shoppinglist-product.entity';

@Controller('shoppinglist-products')
export class ShoppingListProductsController {
  constructor(private readonly shoppingListProductsService: ShoppingListProductsService) {}

  @Post()
  create(@Body() createShoppingListProductDto: CreateShoppinglistProductDto): Promise<ShoppinglistProduct> {
    return this.shoppingListProductsService.create(createShoppingListProductDto);
  }

  @Get()
  findAll(): Promise<ShoppinglistProduct[]> {
    return this.shoppingListProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ShoppinglistProduct> {
    return this.shoppingListProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingListProductDto: UpdateShoppinglistProductDto): Promise<ShoppinglistProduct> {
    return this.shoppingListProductsService.update(+id, updateShoppingListProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shoppingListProductsService.remove(+id);
  }
}
