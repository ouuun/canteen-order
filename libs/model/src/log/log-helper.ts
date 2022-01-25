import { Transaction } from 'sequelize';
import { Model } from 'sequelize-typescript';
import {
  BuildOptions,
  DestroyOptions,
  Hookable,
  Logging,
  Paranoid,
  Silent,
  Transactionable,
} from 'sequelize/types/lib/model';
import { Sequence } from '@model/model/sequence/sequence.model';
import { SEQUENCE_NAME } from '@model/model/sequence/sequence.interface';
import { Log } from '@model/model/log/log.model';
import { LOG_ACTION } from '@model/model/log/log.interface';

export class LogHelper {
  static async buildOptions(
    operId: number,
    transaction: Transaction,
  ): Promise<LogSaveOptions> {
    return {
      log: { request: await LogHelper.buildRequest(operId) },
      transaction: transaction,
    };
  }

  static cloneOptions(options: LogSaveOptions): LogSaveOptions {
    const options2 = Object.assign({}, options);
    const request2 = JSON.parse(JSON.stringify(options2.log.request));
    request2.action = undefined;
    options2.log = { request: request2 };
    return options2;
  }

  static async buildRequest(operId: number): Promise<LogRequest> {
    const seq = await Sequence.seq(SEQUENCE_NAME.日志);
    return {
      requestNo: String(seq),
      operId: operId,
    };
  }

  static buildLog(instance: Model, req: LogRequest): Log {
    const log = Log.build(req);
    log.entity = (instance as any).getModalType().tableName;
    log.entityId = instance.id;
    return log;
  }

  static beforeSave(instance: Model, options: LogSaveOptions) {
    if (!options.log?.request) return;

    const log = LogHelper.buildLog(instance, options.log.request);
    if (instance.isNewRecord) {
      add(instance, log);
    } else {
      update(instance, log);
    }
    options.log.record = log;
  }

  static async afterSave(instance: Model, options: LogSaveOptions) {
    if (!options.log?.record) return;

    if (!options.log.record.entityId) {
      options.log.record.after.id = options.log.record.entityId = instance.id;
    }

    await options.log.record.save({ transaction: options.transaction });
  }

  static beforeDestroy(instance: Model, options: LogDestroyOptions) {
    if (!options.log?.request) return;

    const log = LogHelper.buildLog(instance, options.log.request);
    del(instance, log);
    options.log.record = log;
  }

  static async afterDestroy(instance: Model, options: LogDestroyOptions) {
    if (!options.log?.record) return;

    await options.log.record.save({ transaction: options.transaction });
  }
}

function add(instance: Model, log: Log) {
  if (!log.action) log.action = LOG_ACTION.add;
  if (!log.note) log.note = '新增';

  log.after = JSON.parse(JSON.stringify(instance.get()));
}

function update(instance: Model, log: Log) {
  if (!log.action) log.action = LOG_ACTION.update;
  if (!log.note) log.note = '修改';

  log.before = {};
  log.after = {};
  log.changes = {};

  const saving = instance as any;
  saving._changed.forEach((k: string) => {
    log.before[k] = saving._previousDataValues[k];
    log.after[k] = saving.dataValues[k];
    log.changes[k] = [log.before[k], log.after[k]];
  });
}

function del(instance: Model, log: Log) {
  if (!log.action) log.action = LOG_ACTION.delete;
  if (!log.note) log.note = '删除';

  log.before = JSON.parse(
    JSON.stringify((instance as any)._previousDataValues),
  );
}

export interface LogRequest {
  // instance: Model;
  parentId?: number;
  requestNo?: string;
  operId: number;
  action?: string;
  note?: string;
  more?: any;
}

interface LogOptions {
  request: LogRequest;
  record?: Log;
}

export interface LogSaveOptions<TAttributes = any>
  extends BuildOptions,
    Logging,
    Silent,
    Transactionable,
    Hookable,
    Paranoid {
  log?: LogOptions;
}

export interface LogDestroyOptions<TAttributes = any>
  extends DestroyOptions<TAttributes> {
  log?: LogOptions;
}
