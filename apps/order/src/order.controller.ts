import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { OrderService } from '@model/model/order/order/order.service';
import { Order } from '@model/model/order/order/order.model';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Body() body: any, @Req() request: any): Promise<Order> {
    const user = request.user;
    return await this.orderService.createOrder(
      Object.assign({}, body, { operId: user.id }),
    );
  }

  @Get('get')
  async get(@Query() query: any): Promise<Order> {
    return await this.orderService.getOrder(query);
  }

  @Post('pay')
  async pay(@Body() body: any, @Req() request: any): Promise<Order> {
    const user = request.user;
    return await this.orderService.payOrder(
      Object.assign({}, body, { operId: user.id }),
    );
  }
}
