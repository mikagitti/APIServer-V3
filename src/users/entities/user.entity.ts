import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Usershoppinglists } from 'src/user-shoppinglists/entities/user-shoppinglist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.shoppingLists)
  user: User;

  @OneToMany(
    () => Usershoppinglists,
    (userShoppingLists) => userShoppingLists.user,
    { cascade: true, onDelete: 'CASCADE' },
  )
  shoppingLists: Usershoppinglists[];
}
