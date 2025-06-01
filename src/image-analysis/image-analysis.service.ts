import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class ImageAnalysisService {
  private readonly logger = new Logger(ImageAnalysisService.name);

  constructor(private readonly openAiService: OpenAIService) {
    this.logger.log('ImageAnalysisService initialized');
  }

  async processImage(imageFile: Express.Multer.File) {
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
      /* TODO: Calculate Macros based on formulas, save calcualted calories and compare them with the predicted by GPT */
      return response;
    } catch (error) {
      this.logger.error('Error processing image', error);
      throw new InternalServerErrorException('Failed to analyze image');
    }
  }
}
