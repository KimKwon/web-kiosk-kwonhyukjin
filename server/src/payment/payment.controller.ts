import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  create(@Body() paymentInfo: CreatePaymentDto) {
    return 'created';
  }
}
