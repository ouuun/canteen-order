import {
  AfterCreate,
  AfterDestroy,
  AfterUpdate,
  BeforeCreate,
  BeforeDestroy,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { LogHelper } from '@model/model/log/log/log-helper';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';

@Table({ tableName: 'type', timestamps: true })
export class Type extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER })
  sort: number;

  @HasMany(() => Dish, 'type')
  Dishes: Dish[];

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: Type, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: Type, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: Type, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: Type, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof Type {
    return Type;
  }
}
