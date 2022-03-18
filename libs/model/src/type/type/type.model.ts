import {
  AfterCreate,
  AfterDestroy,
  AfterUpdate,
  BeforeCreate,
  BeforeDestroy,
  BeforeUpdate,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import { LogHelper } from '@model/model/log/log/log-helper';

@Table({ tableName: 'type', timestamps: true })
export class Type extends Model {
  @Column
  name: string;

  @Column
  sort: number;

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
