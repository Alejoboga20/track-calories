import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { ImageAnalysisService } from './image-analysis.service';

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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      storage: memoryStorage(),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageAnalysisService.processImage(file);
  }
}
