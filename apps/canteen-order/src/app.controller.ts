import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as assert from 'assert';
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query: any): string {
    assert(0 === 1, 'err test');
    // throw new Error('test');
    return '123';
  }
}
