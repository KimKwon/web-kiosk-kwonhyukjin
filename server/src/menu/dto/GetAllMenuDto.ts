import { BaseMenuDto } from './BaseMenuDto';

export class GetAllMenuDto {
  readonly [categoryId: string]: BaseMenuDto[];
}
