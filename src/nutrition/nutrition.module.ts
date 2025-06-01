import { Module } from '@nestjs/common';

import { OpenAIModule } from 'src/openai/openai.module';
import { UserModule } from 'src/user/user.module';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';

@Module({
  controllers: [NutritionController],
  providers: [NutritionService],
  imports: [OpenAIModule, UserModule],
})
export class NutritionModule {}
