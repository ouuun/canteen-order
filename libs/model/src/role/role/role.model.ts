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
import { User } from '@model/model/user/user/user.model';

@Table({ tableName: 'role', timestamps: true })
export class Role extends Model {
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.INTEGER })
  role: number;

  @BelongsTo(() => User, 'userId')
  User: User;

  @BeforeUpdate
  @BeforeCreate
  static beforeSaving(instance: Role, options: any) {
    LogHelper.beforeSave(instance, options);
  }

  @AfterUpdate
  @AfterCreate
  static async afterSaving(instance: Role, options: any) {
    await LogHelper.afterSave(instance, options);
  }

  @BeforeDestroy
  static beforeDeleting(instance: Role, options: any) {
    return LogHelper.beforeDestroy(instance, options);
  }

  @AfterDestroy
  static async afterDeleting(instance: Role, options: any) {
    await LogHelper.afterDestroy(instance, options);
  }

  getModalType(): typeof Role {
    return Role;
  }
}
