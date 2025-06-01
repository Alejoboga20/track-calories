import { IsString, IsNumber, IsEnum } from 'class-validator';
import { PhysicalActivity, Objective } from '../enums/user.enums';

export class CreateUserDto {
  @IsString({ message: 'username must be a string' })
  username: string;

  @IsNumber({}, { message: 'age must be a number' })
  age: number;

  @IsNumber({}, { message: 'weight must be a number (in kilograms).' })
  weight: number;

  @IsNumber({}, { message: 'height must be a number (in centimeters).' })
  height: number;

  @IsEnum(Objective)
  objective: Objective;

  @IsEnum(PhysicalActivity)
  physicalActivity: PhysicalActivity;
}
