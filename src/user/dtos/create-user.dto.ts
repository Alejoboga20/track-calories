import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { PhysicalActivity, Objective } from '../enums/user.enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'alejoboga',
    description: 'Unique username for the user',
  })
  @IsString({ message: 'username must be a string' })
  username: string;

  @ApiProperty({ example: 29, description: 'Age in years' })
  @IsNumber({}, { message: 'age must be a number' })
  age: number;

  @ApiProperty({ example: 70, description: 'Weight in kilograms' })
  @IsNumber({}, { message: 'weight must be a number (in kilograms).' })
  weight: number;

  @ApiProperty({ example: 175, description: 'Height in centimeters' })
  @IsNumber({}, { message: 'height must be a number (in centimeters).' })
  height: number;

  @ApiProperty({
    enum: Objective,
    example: Objective.KEEP,
    description: 'User’s health objective',
  })
  @IsEnum(Objective)
  objective: Objective;

  @ApiProperty({
    enum: PhysicalActivity,
    example: PhysicalActivity.MEDIUM,
    description: 'User’s physical activity level',
  })
  @IsEnum(PhysicalActivity)
  physicalActivity: PhysicalActivity;
}
