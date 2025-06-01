import { Module } from '@nestjs/common';
import { NutritionModule } from './nutrition/nutrition.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfigVars } from './config/envs';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(envConfigVars.mongoUri),
    UserModule,
    NutritionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
