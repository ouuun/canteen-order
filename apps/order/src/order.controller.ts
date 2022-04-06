import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { OrderService } from '@model/model/order/order/order.service';
import { Order } from '@model/model/order/order/order.model';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
    //
  }

  @Get('get')
  async get(@Query() query: any): Promise<Order> {
    return await this.orderService.getOrder(query);
  }

  @Get('getAll')
  async getAll(@Query() query: any, @Req() request: any): Promise<Order[]> {
    const user = request.user;
    return await this.orderService.getOrderAll(user.id);
  }

  @Post('create')
  async create(@Body() body: any, @Req() request: any): Promise<Order> {
    const user = request.user;
    return await this.orderService.createOrder(
      Object.assign({}, body, { operId: user.id }),
    );
  }

  @Post('pay')
  async pay(@Body() body: any, @Req() request: any): Promise<Order> {
    const user = request.user;
    return await this.orderService.payOrder(
      Object.assign({}, body, { operId: user.id }),
    );
  }
}
