import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order } from '@model/model/order/order/order.model';
import { OrderCreateRequest } from '@model/model/order/order/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  public async createOrder(req: OrderCreateRequest): Promise<Order> {
    return null;
  }

  private async buildOrder(): Promise<any> {
    //
  }

  private async buildItems(): Promise<any> {
    //
  }

  private async saveAll(): Promise<any> {
    //
  }

  private async addToQueue(): Promise<any> {
    //
  }
}
