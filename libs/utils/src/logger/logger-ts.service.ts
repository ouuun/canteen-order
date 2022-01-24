import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as moment from 'moment/moment';

@Injectable()
export class LoggerTsService extends ConsoleLogger {
  getTimestamp() {
    // return new Date().toISOString();
    return moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss.SSS');
  }
}
