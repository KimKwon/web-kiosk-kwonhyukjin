import { Body, Controller, Post } from '@nestjs/common';
import { CreateSalesDto } from './dto/sales.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() initialSales: CreateSalesDto) {
    return this.salesService.create(initialSales);
  }
}
