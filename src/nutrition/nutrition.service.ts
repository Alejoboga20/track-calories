import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class NutritionService {
  private readonly logger = new Logger(NutritionService.name);

  constructor(private readonly openAiService: OpenAIService) {
    this.logger.log('NutritionService initialized');
  }

  async processImage(imageFile: Express.Multer.File, user: User) {
    this.logger.log('Processing file');
    this.logger.log(`User data: ${JSON.stringify(user)}`);
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

      return response;
    } catch (error) {
      this.logger.error('Error processing image', error);
      throw new InternalServerErrorException('Failed to analyze image');
    }
  }
}
