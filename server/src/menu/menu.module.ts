import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Category } from 'src/entities/Category';
import { Item } from 'src/entities/Item';
import { Size } from 'src/entities/Size';
import { SalesDetail } from 'src/entities/SalesDetail';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Category, Size, SalesDetail])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
