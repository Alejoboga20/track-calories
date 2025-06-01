import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { ImageAnalysisService } from './image-analysis.service';
import { ApiKeyGuard } from 'src/user/guards/api-key.guard';
import { User } from 'src/user/schemas/user.schema';

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

@Controller('image-analysis')
export class ImageAnalysisController {
  constructor(private readonly imageAnalysisService: ImageAnalysisService) {}

  @UseGuards(ApiKeyGuard)
  @Post('analyze')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      storage: memoryStorage(),
    }),
  )
  analyzeImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = (req as any).user as User;

    return this.imageAnalysisService.processImage(file, user);
  }
}
