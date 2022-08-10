import { IsNumber, IsBoolean, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateEmptySalesDto {
  @IsNumber()
  readonly paymentMethodId: number;

  @IsNumber()
  readonly givenPrice?: number;

  @IsNumber()
  readonly totalAmount?: number;
}

export class ItemInSalesDto {
  @IsNumber()
  readonly itemId: number;

  @IsDecimal()
  readonly total: number;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly sizeId: number;

  @IsBoolean()
  readonly isIce: number;
}

export class CreateSalesDto {
  @IsNumber()
  readonly paymentMethodId: number;

  @IsNumber()
  readonly givenPrice?: number;

  @IsNotEmpty()
  readonly itemList: ItemInSalesDto[];
}
