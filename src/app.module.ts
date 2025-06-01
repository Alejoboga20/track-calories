import { Module } from '@nestjs/common';
import { ImageAnalysisModule } from './image-analysis/image-analysis.module';

@Module({
  imports: [ImageAnalysisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
