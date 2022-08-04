import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/Item';
import { Repository } from 'typeorm';
import { GetAllMenuDto } from './dto/GetAllMenuDto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Item) private menuRepository: Repository<Item>,
  ) {}
  async findAll(): Promise<GetAllMenuDto> {
    const allItems = await this.menuRepository.find();
    const itemsClassifiedByCategory = allItems.reduce((acc, cur) => {
      const { categoryId, ...itemInfo } = cur;

      return {
        ...acc,
        [categoryId]: Array.isArray(acc[categoryId])
          ? [...acc[categoryId], itemInfo]
          : [itemInfo],
      };
    }, {});

    return itemsClassifiedByCategory;
  }

  findOne(id: number): Promise<Item> {
    return this.menuRepository.findOne({
      relations: ['sizes'],
      where: {
        id,
      },
    });
  }
}
