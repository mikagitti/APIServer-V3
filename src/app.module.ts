import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { ProductsModule } from './products/products.module';
import { ShoppingListProductsModule } from './shoppinglist-products/shoppinglist-products.module';
import { UserShoppingListsModule } from './user-shoppinglists/user-shoppinglists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // set to false in production
        connectTimeout: 30000, // Set connection timeout to 30 seconds
      }),
      inject: [ConfigService],
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
