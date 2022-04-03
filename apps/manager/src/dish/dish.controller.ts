import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { DishService } from '@model/model/cuisine/dish/dish/dish.service';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';
import { Public } from '@utils/utils/auth/public.metadata';

@Controller('api/manager/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {
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

  @Post('add')
  async add(@Body() body: any, @Req() request: any): Promise<Dish> {
    const user = request.user;
    return await this.dishService.addDish(
      Object.assign({}, body, { operId: user.id }),
    );
  }

  @Get('get')
  @Public()
  async get(@Query() query: any, @Req() request: any): Promise<Dish> {
    return await this.dishService.getDish(query);
  }

  @Get('search')
  @Public()
  async getAll(@Query() query: any, @Req() request: any): Promise<Dish[]> {
    return await this.dishService.getDishes(query);
  }

  @Get('getByType')
  @Public()
  async getByType(@Query() query: any, @Req() request: any): Promise<Dish[]> {
    return await this.dishService.getDishByType(query);
  }

  @Post('update')
  async update(@Body() body: any, @Req() request: any): Promise<Dish> {
    const user = request.user;
    return await this.dishService.updateDish(
      Object.assign({}, body, { operId: user.id }),
    );
  }
}
