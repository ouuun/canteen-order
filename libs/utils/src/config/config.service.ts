import { Injectable } from '@nestjs/common';
import * as assert from 'assert';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as connect from '/var/config/connect.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as configs from '/var/config/canteen-order.json';

@Injectable()
export class ConfigService {
  public env = '';
  public portCanteenOrder: number;

  constructor(private readonly logger: LoggerTsService) {
    if (!this.env) this.loadConfigs();
    this.logger.log('ConfigService initialized', 'ConfigService');
  }

  loadConfigs(): void {
    this.env = process.env.NODE_ENV || 'local';
    const env = configs.envs.find((x: any) => x.name === this.env);
    assert(env, `no env ${this.env} in config file`);
    this.portCanteenOrder = Number(env.port_canteenOrder);
  }
}
