import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { SEQUENCE_NAME } from '@model/model/sequence/sequence.interface';

@Table({ tableName: 'sequences', timestamps: true, paranoid: true })
export class Sequence extends Model {
  @Column
  name: SEQUENCE_NAME;

  @Column
  seq: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  getModalType(): typeof Sequence {
    return Sequence;
  }

  static async seq(name: SEQUENCE_NAME): Promise<number> {
    let res = 0;

    const sequence = Sequence.build({ name: name, seq: 0 });
    await sequence.sequelize.transaction(async (t) => {
      const seq =
        (await Sequence.findOne({
          attributes: ['id', 'seq'],
          where: { name: name },
          transaction: t,
          lock: t.LOCK.UPDATE,
        })) || sequence;
      seq.seq += 1;
      await seq.save({ transaction: t });

      res = seq.seq;
    });

    return res;
  }
}
