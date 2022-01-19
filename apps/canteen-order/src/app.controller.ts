import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as assert from 'assert';
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query: any): string[] {
    const a = [];
    assert(1 < 0, 'bbbbbbb');
    return ['123'];
  }
}
