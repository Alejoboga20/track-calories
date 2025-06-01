import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class GetFoodsDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  limit: number = 10;
}
