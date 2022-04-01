import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('api/manager/dish')
export class DishController {
  constructor() {
    //
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    fs.writeFile(`/var/images/${file.originalname}`, file.buffer, () => {
      //
    });
    return `https://www.fanjiaming.top/images/${file.originalname}`;
  }
}
