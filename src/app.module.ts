import { Module } from '@nestjs/common';
import { ImageAnalysisModule } from './image-analysis/image-analysis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ImageAnalysisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
