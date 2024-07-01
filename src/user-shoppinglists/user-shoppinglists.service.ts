import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usershoppinglists } from './entities/user-shoppinglist.entity';
import { CreateUserShoppinglistDto } from './dto/create-user-shoppinglist.dto';
import { UpdateUserShoppinglistDto } from './dto/update-user-shoppinglist.dto';
import { User } from 'src/users/entities/user.entity';
import { Shoppinglistproducts } from 'src/shoppinglist-products/entities/shoppinglist-product.entity';

type ShoppingListType = {
  id: number;
  name: string;
  user_id: number;
};

@Injectable()
export class UserShoppingListsService {
  constructor(
    @InjectRepository(Usershoppinglists)
    private userShoppingListsRepository: Repository<Usershoppinglists>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Shoppinglistproducts)
    private shoppingListProductsRepository: Repository<Shoppinglistproducts>,
  ) {}

  async create(
    createUserShoppingListDto: CreateUserShoppinglistDto,
  ): Promise<Usershoppinglists> {
    const user = await this.usersRepository.findOneBy({
      id: createUserShoppingListDto.user_id,
    });

    if (!user) {
      throw new Error('User not found!');
    }

    const userShoppingList = await this.userShoppingListsRepository.create({
      ...createUserShoppingListDto,
      user,
    });

    return await this.userShoppingListsRepository.save(userShoppingList);
  }

  findAll(): Promise<Usershoppinglists[]> {
    return this.userShoppingListsRepository.find({ relations: ['user'] });
  }

  async findAllByUserId(
    userId: number,
  ): Promise<ShoppingListType[] | { message: string }> {
    const userShoppingLists = await this.userShoppingListsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!userShoppingLists.length) {
      return { message: `No shopping lists found for user with ID ${userId}.` };
    }

    return this.makeUserShoppingListArray(userShoppingLists);
  }

  private makeUserShoppingListArray(
    shoppingListArray: Usershoppinglists[],
  ): ShoppingListType[] {
    const userShoppingLists: ShoppingListType[] = shoppingListArray.map(
      (x) => ({
        id: x.id,
        name: x.name,
        user_id: x.user.id,
      }),
    );

    return userShoppingLists;
  }

  async update(
    id: number,
    updateUserShoppingListDto: UpdateUserShoppinglistDto,
  ): Promise<Usershoppinglists> {
    await this.userShoppingListsRepository.update(
      id,
      updateUserShoppingListDto,
    );
    return this.userShoppingListsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const shoppingListProducts = await this.shoppingListProductsRepository.find(
      {
        where: { shoppinglist: { id: id } },
      },
    );

    for (const product of shoppingListProducts) {
      await this.shoppingListProductsRepository.delete(product.id);
    }

    await this.userShoppingListsRepository.delete(id);
  }
}
