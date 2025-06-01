import { Module } from '@nestjs/common';

import { OpenAIModule } from 'src/openai/openai.module';
import { UserModule } from 'src/user/user.module';
import { ImageAnalysisService } from './image-analysis.service';
import { ImageAnalysisController } from './image-analysis.controller';

@Module({
  controllers: [ImageAnalysisController],
  providers: [ImageAnalysisService],
  imports: [OpenAIModule, UserModule],
})
export class ImageAnalysisModule {}
