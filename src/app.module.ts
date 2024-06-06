import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { ProductsModule } from './products/products.module';
import { ShoppingListProductsModule } from './shoppinglist-products/shoppinglist-products.module';
import { UserShoppingListsModule } from './user-shoppinglists/user-shoppinglists.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'testaajamina',
    password: 'testaajajokatestaa',
    database: 'NestDB',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // set to false in production    
    connectTimeout: 30000, // Set connection timeout to 30 seconds
  }), 
  UsersModule, 
  AdminsModule, 
  ProductsModule, 
  ShoppingListProductsModule, 
  UserShoppingListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
