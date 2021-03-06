import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Type } from '@model/model/cuisine/type/type/type.model';
import { LogHelper } from '@model/model/log/log/log-helper';
import { LOG_ACTION } from '@model/model/log/log/log.interface';
import { UpdateEntity } from '@model/model/model-utils';
import { Op } from 'sequelize';
import * as assert from 'assert';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';

@Injectable()
export class TypeService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  public async getAll(): Promise<Type[]> {
    return await Type.findAll({ attributes: ['id', 'name', 'sort'] });
  }

  public async addType(req: any): Promise<Type> {
    const type = await Type.build(req);
    await this.checkRepeat(type);
    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.add;
      options.log.request.note = '新增类型';
      await type.save(options);
    });
    return type;
  }

  public async deleteType(req: any): Promise<Type> {
    const type = await Type.findOne({ where: { id: req.id } });
    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.delete;
      options.log.request.note = '删除类型';
      await type.destroy(options);
    });
    return type;
  }

  public async updateType(req: any): Promise<Type> {
    const type = await Type.findOne({ where: { id: req.id } });
    UpdateEntity(type, req);

    await this.checkRepeat(type);

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.update;
      options.log.request.note = '修改类型';
      await type.save(options);
    });
    return type;
  }

  public async sortType(req: any): Promise<Type[]> {
    const ids = req.sorted.map((item) => item.id);
    const types = await Type.findAll({ where: { id: { [Op.in]: ids } } });
    types.forEach((type) => {
      UpdateEntity(
        type,
        req.sorted.find((item) => type.id === item.id),
      );
    });

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.update;
      options.log.request.note = '更新类型';

      const promise = [];
      for (const type of types) {
        promise.push(await type.save(options));
      }
      await Promise.all(promise);
    });
    return types;
  }

  private async checkRepeat(type: any) {
    const types = await Type.findAll();
    const check = types.find((t) => t.name == type.name);
    assert(check === undefined, '类型重复,操作失败!');
  }

  public async getAllWithDish(): Promise<Type[]> {
    return Type.findAll({
      include: [{ model: Dish, required: false, where: { active: true } }],
    });
  }
}
