import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import {
  DishCheck,
  DishPrice,
  DishTaste,
} from '@model/model/cuisine/dish/dish/dish.interface';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';
import * as assert from 'assert';
import { Type } from '@model/model/cuisine/type/type/type.model';
import { LogHelper } from '@model/model/log/log/log-helper';
import { LOG_ACTION } from '@model/model/log/log/log.interface';
import { UpdateEntity } from '@model/model/model-utils';

@Injectable()
export class DishService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  public async addDish(req: any): Promise<Dish> {
    await this.checkDish(req);
    const dish = await Dish.build(req);

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.add;
      options.log.request.note = '新增菜品';
      await dish.save(options);
    });
    return dish;
  }

  private async checkDish(req: addDishRequest) {
    assert(req.name, DishCheck.name);
    const type = await Type.findOne({ where: { id: req.type } });
    assert(type, DishCheck.type);
    assert(req.mainImages, DishCheck.mainImages);
    assert(req.detailImages, DishCheck.detailImages);
    assert(req.prices, DishCheck.prices);
    assert(req.material, DishCheck.material);
    assert(req.cooking, DishCheck.cooking);
    assert(req.weight, DishCheck.weight);
  }

  public async getDish(query: any): Promise<Dish> {
    const dish = await Dish.findOne({ where: { id: query.id } });
    return dish;
  }

  public async updateDish(req: any): Promise<Dish> {
    const dish = await Dish.findOne({ where: { id: req.id } });
    await this.checkDish(req);
    UpdateEntity(dish, req);

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.update;
      options.log.request.note = '修改菜品';
      await dish.save(options);
    });
    return dish;
  }

  async getDishByType(query: any): Promise<Dish[]> {
    return await Dish.findAll({ where: { type: query.typeId } });
  }

  async getDishes(query: any): Promise<Dish[]> {
    return await Dish.findAll({ where: { active: query.active } });
  }
}

interface addDishRequest {
  name: string;
  type: number;
  mainImages: any;
  detailImages: any;
  prices: DishPrice[];
  tastes: DishTaste[];
  material: string;
  cooking: string;
  weight: number;
}
