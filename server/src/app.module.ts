import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentModule } from './payment/payment.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [PaymentModule, MenuModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
