import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order } from '@model/model/order/order/order.model';
import { Op } from 'sequelize';
import * as moment from 'moment/moment';
import { ORDER_STATE } from '@model/model/order/order/order.interface';
import { OrderItem } from '@model/model/order/order_item/order_item.model';

@Injectable()
export class ReportService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {
    //
  }

  public async toDay(): Promise<any> {
    const start = moment().startOf('day').toDate();
    const end = moment().endOf('day').toDate();

    const orders = await Order.findAll({
      where: {
        createdAt: { [Op.between]: [start, end] },
        state: ORDER_STATE.已支付,
      },
      include: OrderItem,
      logging: true,
    });

    const dishNum = orders.reduce((prev, curr) => {
      return (prev += curr.Items.reduce((p, c) => {
        return (p += c.quantity);
      }, 0));
    }, 0);

    const orderNum = orders.length;

    const amount = orders.reduce((prev, curr) => {
      return (prev += curr.price);
    }, 0);

    return {
      dishNum: dishNum,
      orderNum: orderNum,
      amount: amount,
    };
  }
}
