import { Module } from '@nestjs/common';
import { ImageAnalysisService } from './image-analysis.service';
import { ImageAnalysisController } from './image-analysis.controller';
import { OpenAiModule } from 'src/openai/openai.module';

@Module({
  controllers: [ImageAnalysisController],
  providers: [ImageAnalysisService],
  imports: [OpenAiModule],
})
export class ImageAnalysisModule {}
