import { Controller, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Query() query: any): any {
    return { data: 111 };
  }
}
