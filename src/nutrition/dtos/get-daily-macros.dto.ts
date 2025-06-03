import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDailyMacrosDto {
  @ApiProperty({
    description: 'Date to retrieve macros for (ISO 8601 format)',
    example: '2025-06-01',
    type: String,
    format: 'date',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;
}
