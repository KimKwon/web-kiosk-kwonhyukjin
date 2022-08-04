import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/Item';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Item) private menuRepository: Repository<Item>,
  ) {}
  findAll(): Promise<Item[]> {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      relations: ['sizes'],
      where: {
        id,
      },
    });
  }
}
