import {
  AfterCreate,
  AfterDestroy,
  AfterUpdate,
  BeforeCreate,
  BeforeDestroy,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { LogHelper } from '@model/model/log/log/log-helper';

@Table({ tableName: 'order', timestamps: true })
export class Order extends Model {
  @Column({ type: DataType.DECIMAL(6, 2) })
  price: number;

  @Column({ type: DataType.STRING })
  state: string;

  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.INTEGER })
  tableId: number;

  @Column({ type: DataType.STRING })
  out_trade_no: string;

  @Column({ type: DataType.JSON })
  remark: any;

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: Order, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: Order, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: Order, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: Order, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof Order {
    return Order;
  }
}
