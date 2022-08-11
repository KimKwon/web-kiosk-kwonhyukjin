import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Item } from 'src/entities/Item';
import { SalesDetail } from 'src/entities/SalesDetail';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Item) private menuRepository: Repository<Item>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(SalesDetail)
    private salesDetailRepository: Repository<SalesDetail>,
  ) {}

  async findPopularMenuIdWithLimit(limit: number) {
    const groupBySumOfAmount = await this.salesDetailRepository
      .createQueryBuilder('sd')
      .select(['SUM(amount) as sumAmount', 'item_id as itemId'])
      .groupBy('item_id')
      .orderBy('sumAmount', 'DESC')
      .limit(limit)
      .execute();

    if (groupBySumOfAmount.length === 0) return null;

    const popularMenuIds = groupBySumOfAmount.reduce(
      (acc, { itemId }) => [...acc, itemId],
      [],
    );

    await this.menuRepository
      .createQueryBuilder()
      .update({ rank: null })
      .where('rank > 0')
      .execute();

    const updatePromises = popularMenuIds.map((id, index) =>
      this.menuRepository.update(id, {
        rank: index + 1,
      }),
    );

    await Promise.all(updatePromises);
  }

  async findAll() {
    await this.findPopularMenuIdWithLimit(3);
    return await this.categoryRepository.find({
      relations: ['items'],
    });
  }

  async findOne(id: number): Promise<Item> {
    const result = await this.menuRepository.findOne({
      relations: ['sizes'],
      where: {
        id,
      },
    });

    if (!result) throw new HttpException('Invalid Menu Id', 404);

    return result;
  }
}
