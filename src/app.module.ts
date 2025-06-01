import { Module } from '@nestjs/common';
import { ImageAnalysisModule } from './image-analysis/image-analysis.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfigVars } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(envConfigVars.mongoUri),
    ImageAnalysisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
