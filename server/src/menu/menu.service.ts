import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Item } from 'src/entities/Item';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Item) private menuRepository: Repository<Item>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find({
      relations: ['items'],
    });
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
