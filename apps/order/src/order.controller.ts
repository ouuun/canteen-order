import { Controller, Get } from '@nestjs/common';

@Controller('api/order')
export class OrderController {
  constructor() {}

  @Get()
  getHello(): string {
    return null;
  }
}
