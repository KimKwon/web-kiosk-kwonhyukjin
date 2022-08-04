import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { PaymentModule } from './payment/payment.module';
import { MenuModule } from './menu/menu.module';
import { Category } from './entities/Category';
import { Item } from './entities/Item';
import { Size } from './entities/Size';
import { PaymentMethod } from './entities/PaymentMethod';
import { Sales } from './entities/Sales';
import { SalesDetail } from './entities/SalesDetail';

const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isDevelopment ? '.env.development' : '.env.production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'mysql',
        host: c.get('HOST'),
        username: c.get('USERNAME'),
        password: c.get('PASSWORD'),
        port: c.get('PORT'),
        database: c.get('DATABASE_NAME'),
        synchronize: isDevelopment,
        entities: [Category, Item, Size, PaymentMethod, Sales, SalesDetail],
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    PaymentModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
