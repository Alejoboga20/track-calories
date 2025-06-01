import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OpenAIModule } from 'src/openai/openai.module';
import { UserModule } from 'src/user/user.module';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { FoodEntry, FoodEntrySchema } from './schemas/food-entry.schema';
import { FoodRepository } from './repositories/food.repository';

@Module({
  controllers: [NutritionController],
  providers: [NutritionService, FoodRepository],
  imports: [
    OpenAIModule,
    UserModule,
    MongooseModule.forFeature([
      { name: FoodEntry.name, schema: FoodEntrySchema },
    ]),
  ],
})
export class NutritionModule {}
