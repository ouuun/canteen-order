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
  Table as table,
} from 'sequelize-typescript';
import { LogHelper } from '@model/model/log/log/log-helper';

@table({ tableName: 'table', timestamps: true })
export class Table extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  qrCode: string;

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: Table, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: Table, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: Table, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: Table, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof Table {
    return Table;
  }
}
