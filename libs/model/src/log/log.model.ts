import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'log', timestamps: true, updatedAt: false })
export class Log extends Model {
  @Column
  entity: string;

  @Column({ type: DataType.INTEGER })
  entityId: number;

  @Column({ type: DataType.INTEGER })
  parentId: number;

  @Column
  requestNo: string;

  @Column({ type: DataType.INTEGER })
  operId: number;

  @Column
  action: string;

  @Column
  note: string;

  @Column({ type: DataType.JSON })
  before: any;

  @Column({ type: DataType.JSON })
  after: any;

  @Column({ type: DataType.JSON })
  changes: any;

  @Column({ type: DataType.JSON })
  more: any;

  getModalType(): typeof Log {
    return Log;
  }
}
