import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order } from '@model/model/order/order/order.model';
import {
  ORDER_STATE,
  OrderCreateRequest,
  OrderItemRequest,
} from '@model/model/order/order/order.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { LogHelper, LogSaveOptions } from '@model/model/log/log/log-helper';
import { OrderItem } from '@model/model/order/order_item/order_item.model';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';
import * as assert from 'assert';
import { Sequence } from '@model/model/log/sequence/sequence.model';
import { SEQUENCE_NAME } from '@model/model/log/sequence/sequence.interface';
import { LOG_ACTION } from '@model/model/log/log/log.interface';
import { DishService } from '@model/model/cuisine/dish/dish/dish.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
    @InjectQueue('order:paying') private readonly payingQueue: Queue,
    private readonly dishService: DishService,
  ) {}

  public async createOrder(req: OrderCreateRequest): Promise<Order> {
    const order = await this.buildOrder(req);

    for (const itemRequest of req.items) {
      order.Items.push(await this.buildItems(itemRequest));
    }

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.add;
      options.log.request.note = '创建订单';
      await this.saveAll(order, options);
    });

    await this.addToQueue(order.id);

    return order;
  }

  private async buildOrder(req: OrderCreateRequest): Promise<Order> {
    const order = await Order.build({
      price: 0,
      state: ORDER_STATE.未支付,
    });

    order.tableId = req.table;
    order.userId = req.operId;
    order.Items = [];
    order.remark = req.remark;

    return order;
  }

  private async buildItems(req: OrderItemRequest): Promise<OrderItem> {
    const dish = await Dish.findOne({ where: { id: req.id } });

    //校验价格
    const price =
      (dish.prices[req.priceIndex].price +
        (req.tasteIndex >= 0 ? dish.tastes[req.tasteIndex].price : 0)) *
      req.num;

    assert(price === req.price, '价格发生变化,请重新下单');
    return OrderItem.build({
      name: dish.name,
      amount: price,
      image: dish.mainImages[0],
      dishId: dish.id,
      quantity: req.num,
      price: dish.prices[req.priceIndex],
      taste: req.tasteIndex >= 0 ? dish.tastes[req.tasteIndex] : null,
    });
  }

  private async saveAll(order: Order, options: LogSaveOptions): Promise<any> {
    order.out_trade_no = await this.sequence(options);
    await order.save(options);
    for (const item of order.Items) {
      item.orderId = order.id;
      await item.save(options);
      await this.dishService.changeSale(
        {
          id: item.dishId,
          price: item.price,
          taste: item.taste,
          quantity: item.quantity,
        },
        options,
      );
    }
  }

  private async sequence(options: LogSaveOptions): Promise<string> {
    const timestamp = new Date().getTime();
    const sequence = Sequence.build({ name: SEQUENCE_NAME.订单, seq: 0 });

    const seq =
      (await Sequence.findOne({
        attributes: ['id', 'seq'],
        where: { name: SEQUENCE_NAME.订单 },
        transaction: options.transaction,
        lock: options.transaction.LOCK.UPDATE,
      })) || sequence;
    seq.seq += 1;
    await seq.save(options);
    return `${timestamp}${String(seq.seq).padStart(7, '0')}`;
  }

  private async addToQueue(id: number): Promise<any> {
    await this.payingQueue.add(
      { id: id },
      { delay: 1000 * 6, removeOnComplete: true },
    );
  }

  public async cancelOrder(id: number) {
    const order = await Order.findOne({
      where: { id: id },
      include: OrderItem,
    });
    const user = order.userId;

    order.state = ORDER_STATE.已取消;

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(user, t);
      options.log.request.action = LOG_ACTION.cancel;
      options.log.request.note = '超时取消订单';

      for (const item of order.Items) {
        await this.dishService.changeSale(
          {
            id: item.dishId,
            price: item.price,
            taste: item.taste,
            quantity: -item.quantity,
          },
          options,
        );

        await order.save(options);
      }
    });
  }

  public async getOrder(query: any): Promise<Order> {
    return await Order.findOne({ where: { id: query.id } });
  }

  public async payOrder(req: any): Promise<Order> {
    const order = await Order.findOne({ where: { id: req.id } });

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.cancel;
      options.log.request.note = '支付订单';

      order.state = ORDER_STATE.已支付;
      await order.save(options);
    });
    return order;
  }
}
