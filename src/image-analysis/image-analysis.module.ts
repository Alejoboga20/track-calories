import { Module } from '@nestjs/common';
import { ImageAnalysisService } from './image-analysis.service';
import { ImageAnalysisController } from './image-analysis.controller';
import { OpenAIModule } from 'src/openai/openai.module';

@Module({
  controllers: [ImageAnalysisController],
  providers: [ImageAnalysisService],
  imports: [OpenAIModule],
})
export class ImageAnalysisModule {}
