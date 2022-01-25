import { Injectable } from '@nestjs/common';
import { Sequence } from '@model/model/sequence/sequence.model';
import { SEQUENCE_NAME } from '@model/model/sequence/sequence.interface';

@Injectable()
export class LogService {
  constructor() {
    //
  }

  // async buildRequest(operId: number): Promise<LogRequest> {
  //   return { instance: undefined, requestNo: await this.seq(), operId: operId };
  // }

  async seq(): Promise<string> {
    let seq = await Sequence.findOne({
      attributes: ['id', 'seq'],
      where: { name: SEQUENCE_NAME.日志 },
    });
    if (!seq) seq = Sequence.build({ name: name, seq: 0 });
    seq.seq += 1;
    await seq.save();

    return String(seq.seq);
  }
}
