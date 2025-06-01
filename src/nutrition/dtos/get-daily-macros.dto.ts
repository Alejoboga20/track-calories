import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetDailyMacrosDto {
  @IsDate()
  @Type(() => Date)
  date: Date;
}
