import { Transaction } from 'sequelize';

export enum LOG_ACTION {
  add = 'add',
  update = 'update',
  delete = 'delete',
  //
  sale = 'sale', // goods/dish sale 售出
  //
  use = 'use',
  cancel = 'cancel',
  // 客房预订
  checkin = 'checkin',
  checkout = 'checkout',
  // user coupon
  rollback = 'rollback', // 退回到未使用的状态, 或退返商品菜品库存
  // room type price
  adjust = 'adjust', // 调整客房价格
  close = 'close', // 关闭客房预订
  open = 'open', // 开放客房预订
  // user
  levelup = 'levelup', // 会员等级提升
}

export interface LogRequest {
  instance: any;
  parentId?: number;
  requestNo?: string;
  operId: number;
  action?: string;
  note?: string;
  transaction?: Transaction;
}
