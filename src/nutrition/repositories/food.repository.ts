import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { FoodEntry, FoodEntryDocument } from '../schemas/food-entry.schema';
import { LogFoodDto } from '../dtos/log-food.dto';

@Injectable()
export class FoodRepository {
  constructor(
    @InjectModel(FoodEntry.name)
    private readonly foodModel: Model<FoodEntryDocument>,
  ) {}

  async logFood(
    userId: Types.ObjectId,
    logFoodDto: LogFoodDto,
  ): Promise<FoodEntry> {
    const newFood = this.foodModel.create({ ...logFoodDto, userId });

    return newFood;
  }
}
