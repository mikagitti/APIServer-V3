import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Shoppinglistproducts } from 'src/shoppinglist-products/entities/shoppinglist-product.entity';

@Entity()
export class Usershoppinglists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.shoppingLists)
  user: User;

  @OneToMany(
    () => Shoppinglistproducts,
    (shoppingListProduct) => shoppingListProduct.shoppinglist,
  )
  shoppingListProducts: Shoppinglistproducts[];
}
