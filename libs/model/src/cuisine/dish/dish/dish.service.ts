import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import {
  DishAddCheck,
  DishPrice,
  DishTaste,
} from '@model/model/cuisine/dish/dish/dish.interface';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';
import * as assert from 'assert';
import { Type } from '@model/model/cuisine/type/type/type.model';
import { LogHelper } from '@model/model/log/log/log-helper';
import { LOG_ACTION } from '@model/model/log/log/log.interface';

@Injectable()
export class DishService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  public async addDish(req: any): Promise<Dish> {
    await this.checkAdd(req);
    const dish = await Dish.build(req);

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(req.operId, t);
      options.log.request.action = LOG_ACTION.add;
      options.log.request.note = '新增菜品';
      await dish.save(options);
    });
    return dish;
  }

  private async checkAdd(req: addDishRequest) {
    assert(req.name, DishAddCheck.name);
    const type = await Type.findOne({ where: { id: req.type } });
    assert(type, DishAddCheck.type);
    assert(req.mainImages, DishAddCheck.mainImages);
    assert(req.detailImages, DishAddCheck.detailImages);
    assert(req.prices, DishAddCheck.prices);
    assert(req.material, DishAddCheck.material);
    assert(req.cooking, DishAddCheck.cooking);
    assert(req.weight, DishAddCheck.weight);
  }

  public async getDish(query: any): Promise<Dish> {
    const dish = await Dish.findOne({ where: { id: query.id } });
    return dish;
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
