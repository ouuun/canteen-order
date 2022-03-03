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

@Table({ tableName: 'user', timestamps: false })
export class User extends Model {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  openid: string;

  @Column
  image: string;

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: User, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: User, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: User, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: User, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof User {
    return User;
  }
}
