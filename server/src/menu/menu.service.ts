import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }
}
