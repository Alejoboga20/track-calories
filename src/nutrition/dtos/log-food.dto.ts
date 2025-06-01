import { IsString, IsNumber } from 'class-validator';

export class LogFoodDto {
  @IsString()
  dish: string;

  @IsNumber()
  protein: number;

  @IsNumber()
  carbs: number;

  @IsNumber()
  fat: number;

  @IsNumber()
  calories: number;
}
