import { Transaction } from 'sequelize';

export enum LOG_ACTION {
  add = 'add',
  update = 'update',
  delete = 'delete',
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
