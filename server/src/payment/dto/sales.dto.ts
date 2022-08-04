import { IsNumber, IsString } from 'class-validator';

export class CreateSalesDto {
  @IsString()
  readonly paymentMethodId: number;

  @IsNumber()
  readonly givenPrice?: number;

  @IsNumber()
  readonly totalAmount?: number;
}
