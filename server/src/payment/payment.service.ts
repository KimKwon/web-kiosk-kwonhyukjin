import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/entities/PaymentMethod';
import { Sales } from 'src/entities/Sales';
import { SalesDetail } from 'src/entities/SalesDetail';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/payment.dto';
import { CreateSalesDto } from './dto/sales.dto';
import { CreateSalesDetailDto } from './dto/salesDeatil.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Sales)
    private salesRepository: Repository<Sales>,

    @InjectRepository(SalesDetail)
    private salesDetailRepository: Repository<SalesDetail>,

    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  private createSales(createSalesDto: CreateSalesDto) {
    return this.salesRepository.create(createSalesDto);
  }

  private createSalesDetail(createSalesDetailDto: CreateSalesDetailDto) {
    return this.salesDetailRepository.create(createSalesDetailDto);
  }

  private async findPaymentMethodId(methodName: PaymentMethod['name']) {
    const targetMethod = await this.paymentMethodRepository.findOneBy({
      name: methodName,
    });

    return targetMethod.id;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const { paymentMethod, givenPrice, itemList } = createPaymentDto;

    const paymentMethodId = await this.findPaymentMethodId(paymentMethod);

    const createdSales = this.createSales({
      paymentMethodId,
      givenPrice,
    });

    await this.salesRepository.save(createdSales);

    const [salesTotalAmount, pendingSalesDetailList] = itemList.reduce(
      ([a_total, a_sales_detail], { total, ...salesDetail }) => {
        return [
          a_total + total,
          [
            ...a_sales_detail,
            this.createSalesDetail({
              ...salesDetail,
              salesId: createdSales.id,
            }),
          ],
        ];
      },
      [0, []],
    );

    createdSales.totalAmount = salesTotalAmount;
    this.salesRepository.save(createdSales);
    await Promise.all(
      pendingSalesDetailList.map((salesDetail) =>
        this.salesDetailRepository.save(salesDetail),
      ),
    );

    return createdSales.id;
  }
}
