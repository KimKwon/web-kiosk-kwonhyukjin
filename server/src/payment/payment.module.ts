import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from 'src/entities/Sales';
import { SalesDetail } from 'src/entities/SalesDetail';
import { PaymentMethod } from 'src/entities/PaymentMethod';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, SalesDetail, PaymentMethod])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
