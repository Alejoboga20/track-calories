import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Req,
  Query,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { NutritionService } from './nutrition.service';
import {
  ApiKeyGuard,
  AuthenticatedRequest,
} from 'src/user/guards/api-key.guard';
import { GetFoodsDto } from './dtos/get-foods.dto';
import { GetDailyMacrosDto } from './dtos/get-daily-macros.dto';

const imageFileFilter = (
  _: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @UseGuards(ApiKeyGuard)
  @Post('analyze-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      storage: memoryStorage(),
    }),
  )
  analyzeMealPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    return this.nutritionService.addMeal(file, user);
  }

  @UseGuards(ApiKeyGuard)
  @Get('foods')
  getFoods(
    @Req() req: AuthenticatedRequest,
    @Query() getFoodsDto: GetFoodsDto,
  ) {
    const user = req.user;

    return this.nutritionService.getFoods(user, getFoodsDto);
  }

  @UseGuards(ApiKeyGuard)
  @Get('macros')
  getDailyMacros(
    @Req() req: AuthenticatedRequest,
    @Query() getDailyMacrosDto: GetDailyMacrosDto,
  ) {
    const user = req.user;

    return this.nutritionService.getDailyMacrosSummary(user, getDailyMacrosDto);
  }
}
