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

@Table({ tableName: 'order_item', timestamps: true })
export class OrderItem extends Model {
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DECIMAL(6, 2) })
  amount: number;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.INTEGER })
  dishId: number;

  @Column({ type: DataType.INTEGER })
  quantity: number;

  @Column({ type: DataType.JSON })
  price: any;

  @Column({ type: DataType.JSON })
  taste: any;

  @Column({ type: DataType.JSON })
  remark: any;

  // @HasOne(() => Dish, 'type')
  // Dishes: Dish[];

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: OrderItem, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: OrderItem, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: OrderItem, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: OrderItem, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof OrderItem {
    return OrderItem;
  }
}
