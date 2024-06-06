import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserShoppingListsService } from './user-shoppinglists.service';
import { CreateUserShoppinglistDto } from './dto/create-user-shoppinglist.dto';
import { UpdateUserShoppinglistDto } from './dto/update-user-shoppinglist.dto';

@Controller('user-shoppinglists')
export class UserShoppinglistsController {
  constructor(private readonly userShoppinglistsService: UserShoppingListsService) {}

  @Post()
  create(@Body() createUserShoppinglistDto: CreateUserShoppinglistDto) {
    return this.userShoppinglistsService.create(createUserShoppinglistDto);
  }

  @Get()
  findAll() {
    return this.userShoppinglistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userShoppinglistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserShoppinglistDto: UpdateUserShoppinglistDto) {
    return this.userShoppinglistsService.update(+id, updateUserShoppinglistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userShoppinglistsService.remove(+id);
  }
}
