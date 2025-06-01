import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
