import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Usershoppinglists } from 'src/user-shoppinglists/entities/user-shoppinglist.entity';

@Entity()
export class Shoppinglistproducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  is_checked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Usershoppinglists,
    (shoppinglist) => shoppinglist.shoppingListProducts,
  )
  shoppinglist: Usershoppinglists;

  @ManyToOne(() => Product, (product) => product.shoppinglistProducts)
  product: Product;
}
