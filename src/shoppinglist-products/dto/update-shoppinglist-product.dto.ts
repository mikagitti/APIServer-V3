import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppinglistProductDto } from './create-shoppinglist-product.dto';

export class UpdateShoppinglistProductDto extends PartialType(CreateShoppinglistProductDto) {}
