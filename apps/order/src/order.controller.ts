import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderService } from '@model/model/order/order/order.service';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Body() body: any, @Req() request: any): Promise<any> {
    const user = request.user;
    return await this.orderService.createOrder(
      Object.assign({}, body, { operId: user.id }),
    );
  }
}
