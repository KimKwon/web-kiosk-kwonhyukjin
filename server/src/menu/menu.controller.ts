import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  getAllMenu() {
    return this.menuService.findAll();
  }

  @Get(':id')
  getMenuDetail(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }
}
