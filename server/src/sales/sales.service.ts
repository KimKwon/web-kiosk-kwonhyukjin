import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/entities/PaymentMethod';
import { Sales } from 'src/entities/Sales';
import { SalesDetail } from 'src/entities/SalesDetail';
import { Repository } from 'typeorm';
import { CreateEmptySalesDto, CreateSalesDto } from './dto/sales.dto';
import { CreateSalesDetailDto } from './dto/salesDeatil.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private salesRepository: Repository<Sales>,

    @InjectRepository(SalesDetail)
    private salesDetailRepository: Repository<SalesDetail>,

    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  private createSales(createEmptySalesDto: CreateEmptySalesDto) {
    return this.salesRepository.create(createEmptySalesDto);
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

  async create(createSalesDto: CreateSalesDto) {
    const { paymentMethod, givenPrice, itemList } = createSalesDto;

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

    return { salesId: createdSales.id };
  }

  async getDetailOfSales(salesId: number) {
    return await this.salesDetailRepository
      .createQueryBuilder('sb')
      .select([
        'item.name as itemName',
        'item.price as itemPrice',
        'size.name as sizeName',
        'size.surcharge as surcharge',
        'sb.isIce as isIce',
        'sb.amount as amount',
      ])
      .leftJoin('sb.size', 'size')
      .leftJoin('sb.item', 'item')
      .whereInIds({ salesId })
      .execute();
  }

  async findOneSales(salesId: number) {
    const targetSales = await this.salesRepository
      .createQueryBuilder('sales')
      .select([
        'sales.id as id',
        'sales.createdAt as createdAt',
        'sales.totalAmount as totalAmount',
        'sales.givenPrice as givenPrice',
        'paymentMethod.name as paymentMethodName',
      ])
      .leftJoin('sales.paymentMethod', 'paymentMethod')
      .where({ id: salesId })
      .execute();

    if (targetSales.length === 0)
      throw new HttpException('Sales NOT FOUND', 404);

    const targetDetails = await this.getDetailOfSales(salesId);
    if (targetDetails.length === 0)
      throw new HttpException('Invalid Sales', 409);

    return { ...targetSales[0], itemList: targetDetails };
  }
}
