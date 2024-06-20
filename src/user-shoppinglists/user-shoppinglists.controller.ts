import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserShoppingListsService } from './user-shoppinglists.service';
import { CreateUserShoppinglistDto } from './dto/create-user-shoppinglist.dto';
import { UpdateUserShoppinglistDto } from './dto/update-user-shoppinglist.dto';

@Controller('user-shoppinglists')
export class UserShoppinglistsController {
  constructor(
    private readonly userShoppinglistsService: UserShoppingListsService,
  ) {}

  @Post('new')
  async create(@Body() createUserShoppinglistDto: CreateUserShoppinglistDto) {
    return await this.userShoppinglistsService.create(
      createUserShoppinglistDto,
    );
  }

  @Get()
  findAll() {
    return this.userShoppinglistsService.findAll();
  }

  @Get('user/:id')
  async getShoppingListsByUserId(@Param('id') userId: string) {
    return await this.userShoppinglistsService.findAllByUserId(+userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserShoppinglistDto: UpdateUserShoppinglistDto,
  ) {
    return this.userShoppinglistsService.update(+id, updateUserShoppinglistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userShoppinglistsService.remove(+id);
  }
}
