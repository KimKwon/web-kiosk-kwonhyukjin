import { IsNumber } from 'class-validator';

export class CreateSalesDetailDto {
  @IsNumber()
  readonly isIce: number;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly itemId: number;

  @IsNumber()
  readonly sizeId: number;

  @IsNumber()
  readonly salesId: number;
}
