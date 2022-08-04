import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ItemInPaymentDto {
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

export class CreatePaymentDto {
  @IsString()
  readonly paymentMethod: 'CASH' | 'CARD';

  @IsDecimal()
  readonly givenPrice?: number;

  @IsNotEmpty()
  readonly itemList: ItemInPaymentDto[];
}
