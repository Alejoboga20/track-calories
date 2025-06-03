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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('nutrition')
@ApiBearerAuth('api-key')
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
  @ApiOperation({
    summary: 'Analyze an image of food and log its nutrition data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpeg, png, gif, webp)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Returns meal analysis result and logs it to the user journal',
  })
  analyzeMealPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    return this.nutritionService.addMeal(file, user);
  }

  @UseGuards(ApiKeyGuard)
  @Get('foods')
  @ApiOperation({ summary: 'Get all logged foods for a given date' })
  @ApiQuery({
    name: 'date',
    type: String,
    required: true,
    example: '2025-06-01',
  })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of food entries for the user on a given day',
  })
  getFoods(
    @Req() req: AuthenticatedRequest,
    @Query() getFoodsDto: GetFoodsDto,
  ) {
    const user = req.user;

    return this.nutritionService.getFoods(user, getFoodsDto);
  }

  @UseGuards(ApiKeyGuard)
  @Get('macros')
  @ApiOperation({
    summary: 'Get daily total macros and calories for a given date',
  })
  @ApiQuery({
    name: 'date',
    type: String,
    required: true,
    example: '2025-06-01',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns total protein, carbs, fat and calories for the date',
  })
  getDailyMacros(
    @Req() req: AuthenticatedRequest,
    @Query() getDailyMacrosDto: GetDailyMacrosDto,
  ) {
    const user = req.user;

    return this.nutritionService.getDailyMacrosSummary(user, getDailyMacrosDto);
  }
}
