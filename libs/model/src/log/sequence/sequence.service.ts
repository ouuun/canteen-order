import { Injectable } from '@nestjs/common';
import { SEQUENCE_NAME } from '@model/model/log/sequence/sequence.interface';
import { Sequence } from '@model/model/log/sequence/sequence.model';

@Injectable()
export class SequenceService {
  constructor() {
    //
  }

  async seq(name: SEQUENCE_NAME): Promise<number> {
    return Sequence.seq(name);
  }
}
