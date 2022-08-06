import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sales } from 'src/entities/Sales';
import { SalesDetail } from 'src/entities/SalesDetail';
import { PaymentMethod } from 'src/entities/PaymentMethod';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, SalesDetail, PaymentMethod])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
