import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentModule } from './payment/payment.module';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/Category';
import { Item } from './entities/Item';
import { PaymentMethod } from './entities/PaymentMethod';
import { Sales } from './entities/Sales';
import { SalesDetail } from './entities/SalesDetail';
import { Size } from './entities/Size';

@Module({
  imports: [
    PaymentModule,
    MenuModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'kioskdb',
      port: 3306,
      username: 'root',
      password: 'test',
      entities: [Category, Item, PaymentMethod, Sales, SalesDetail, Size],
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
