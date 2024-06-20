import { PartialType } from '@nestjs/mapped-types';
import { CreateUserShoppinglistDto } from './create-user-shoppinglist.dto';

export class UpdateUserShoppinglistDto extends PartialType(CreateUserShoppinglistDto) {}
