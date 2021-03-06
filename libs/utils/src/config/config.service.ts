import { Injectable } from '@nestjs/common';
import * as assert from 'assert';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { Database, Jwt, Redis } from '@utils/utils/config/config.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as connect from '/var/config/connect.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as configs from '/var/config/canteen-order.json';

@Injectable()
export class ConfigService {
  /*env*/
  public env: string;
  public host: string;
  /*port*/
  public portManager: number;
  public portUser: number;
  public portOrder: number;
  /*database*/
  public db: Database;
  /*jwt*/
  public jwt: Jwt;
  /*redis*/
  public redis: Redis;

  constructor(private readonly logger: LoggerTsService) {
    if (!this.env) this.loadConfigs();
    this.logger.log('ConfigService initialized', 'ConfigService');
  }

  loadConfigs(): void {
    /* env */
    this.env = process.env.NODE_ENV || 'local';
    const env = configs.envs.find((x: any) => x.name === this.env);
    assert(env, `no env ${this.env} in config file`);
    /* port */
    this.portManager = Number(env.port_manager);
    this.portUser = Number(env.port_user);
    this.portOrder = Number(env.port_order);
    /* setting */
    this.host = env.host;
    /* dataBase */
    this.db = connect.database.find((x: any) => x.name === env.db_connect);
    /* jwt */
    this.jwt = connect.jwt.find((x: any) => x.name === env.jwt);
    /* redis */
    this.redis = connect.redis.find((x: any) => x.name === env.redis);
  }
}
