import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ImageAnalysisService {
  private readonly logger = new Logger(ImageAnalysisService.name);

  processImage(imageFile: Express.Multer.File) {
    this.logger.log('Processing file');
    const base64Image = imageFile.buffer.toString('base64');

    return {
      message: 'Image received',
      base64Image,
    };
  }
}
