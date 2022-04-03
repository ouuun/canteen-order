import {
  AfterCreate,
  AfterDestroy,
  AfterUpdate,
  BeforeCreate,
  BeforeDestroy,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { LogHelper } from '@model/model/log/log/log-helper';
import { Type } from '@model/model/cuisine/type/type/type.model';
import {
  DishPrice,
  DishTaste,
} from '@model/model/cuisine/dish/dish/dish.interface';

@Table({ tableName: 'dish', timestamps: true })
export class Dish extends Model {
  @Column({ type: DataType.STRING(31) })
  name: string;

  @Column({ type: DataType.INTEGER })
  type: number;

  @Column({ type: DataType.JSON })
  mainImages: any;

  @Column({ type: DataType.JSON })
  detailImages: any;

  @Column({ type: DataType.JSON })
  prices: DishPrice[];

  @Column({ type: DataType.JSON })
  tastes: DishTaste[];

  @Column({ type: DataType.STRING(63) })
  material: string;

  @Column({ type: DataType.STRING(63) })
  cooking: string;

  @Column({ type: DataType.INTEGER })
  weight: number;

  @BelongsTo(() => Type, 'type')
  Type: Type;

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: Dish, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: Dish, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: Dish, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: Dish, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof Dish {
    return Dish;
  }
}
