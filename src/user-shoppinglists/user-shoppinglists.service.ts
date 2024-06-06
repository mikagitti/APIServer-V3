import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserShoppingList } from './entities/user-shoppinglist.entity';
import { CreateUserShoppinglistDto } from './dto/create-user-shoppinglist.dto';
import { UpdateUserShoppinglistDto } from './dto/update-user-shoppinglist.dto';

@Injectable()
export class UserShoppingListsService {
  constructor(
    @InjectRepository(UserShoppingList)
    private userShoppingListsRepository: Repository<UserShoppingList>,
  ) {}

  create(createUserShoppingListDto: CreateUserShoppinglistDto): Promise<UserShoppingList> {
    const userShoppingList = this.userShoppingListsRepository.create(createUserShoppingListDto);
    return this.userShoppingListsRepository.save(userShoppingList);
  }

  findAll(): Promise<UserShoppingList[]> {
    return this.userShoppingListsRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<UserShoppingList> {
    return this.userShoppingListsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updateUserShoppingListDto: UpdateUserShoppinglistDto): Promise<UserShoppingList> {
    await this.userShoppingListsRepository.update(id, updateUserShoppingListDto);
    return this.userShoppingListsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userShoppingListsRepository.delete(id);
  }
}
