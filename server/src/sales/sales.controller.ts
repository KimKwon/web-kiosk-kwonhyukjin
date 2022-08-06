import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSalesDto } from './dto/sales.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() initialSales: CreateSalesDto) {
    return this.salesService.create(initialSales);
  }

  @Get()
  findAllSales() {
    return this.salesService.findSales();
  }

  @Get(':id')
  findOneSales(@Param('id') id: number) {
    return this.salesService.findSales(id);
  }
}
