import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { UserShoppingList } from '../../user-shoppinglists/entities/user-shoppinglist.entity';

@Entity()
export class ShoppinglistProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserShoppingList, shoppinglist => shoppinglist.id)
  shoppinglist: UserShoppingList;

  @ManyToOne(() => Product, product => product.id)
  product: Product;

  @Column({ default: false })
  is_checked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
