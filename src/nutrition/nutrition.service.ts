import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { UserWithId } from '../user/schemas/user.schema';
import { FoodRepository } from './repositories/food.repository';
import { GetFoodsDto } from './dtos/get-foods.dto';
import { GetDailyMacrosDto } from './dtos/get-daily-macros.dto';

@Injectable()
export class NutritionService {
  private readonly logger = new Logger(NutritionService.name);

  constructor(
    private readonly openAiService: OpenAIService,
    private readonly foodRepository: FoodRepository,
  ) {
    this.logger.log('NutritionService initialized');
  }

  async addMeal(imageFile: Express.Multer.File, user: UserWithId) {
    this.logger.log('Processing file');
    const base64Image = imageFile.buffer.toString('base64');

    try {
      const response = await this.openAiService.analyseImage(base64Image);

      if (!response) {
        this.logger.error('No response from OpenAI service');
        throw new InternalServerErrorException(
          'No response from OpenAI service',
        );
      }

      if (response.detected === false) {
        return { detected: false, message: 'No meal detected in the image' };
      }

      await this.foodRepository.logFood(user._id, response);

      return response;
    } catch (error) {
      this.logger.error('Error processing image', error);
      throw new InternalServerErrorException('Failed to analyze image');
    }
  }

  async getFoods(user: UserWithId, getFoodsDto: GetFoodsDto) {
    const foods = await this.foodRepository.findFoods(user._id, getFoodsDto);

    return foods;
  }

  async getDailyMacrosSummary(
    user: UserWithId,
    getDailyMacrosDto: GetDailyMacrosDto,
  ) {
    const dailySummary = await this.foodRepository.calculateDailyMacros(
      user._id,
      getDailyMacrosDto,
    );

    return dailySummary;
  }
}
