import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, Types } from 'mongoose';

import { FoodEntry, FoodEntryDocument } from '../schemas/food-entry.schema';
import { LogFoodDto } from '../dtos/log-food.dto';
import { GetFoodsDto } from '../dtos/get-foods.dto';
import { DailyMacrosSummary } from '../types/macros.interface';

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

  async findFoods(
    userId: Types.ObjectId,
    { date, limit, page }: GetFoodsDto,
  ): Promise<FoodEntry[]> {
    const start = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        0,
        0,
        0,
      ),
    );
    const end = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    const offset = page ? (page - 1) * limit : 0;

    const filter: RootFilterQuery<FoodEntry> = {
      userId,
      createdAt: { $gte: start, $lte: end },
    };

    const foods = await this.foodModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 })
      .exec();

    return foods;
  }

  async calculateDailyMacros(userId: Types.ObjectId, date: Date) {
    const start = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        0,
        0,
        0,
      ),
    );
    const end = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    const result = await this.foodModel
      .aggregate<DailyMacrosSummary>([
        {
          $match: {
            userId,
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            totalCalories: { $sum: '$calories' },
            totalProtein: { $sum: '$protein' },
            totalCarbs: { $sum: '$carbs' },
            totalFat: { $sum: '$fat' },
          },
        },
        {
          $project: {
            _id: 0,
            totalCalories: 1,
            totalProtein: 1,
            totalCarbs: 1,
            totalFat: 1,
          },
        },
      ])
      .exec();

    return result;
  }
}
