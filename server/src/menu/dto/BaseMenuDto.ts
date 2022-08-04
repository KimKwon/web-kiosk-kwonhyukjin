import { OmitType } from '@nestjs/mapped-types';
import { Item } from 'src/entities/Item';

export class BaseMenuDto extends OmitType(Item, [
  'categoryId',
  'category',
  'salesDetails',
  'sizes',
]) {}
