import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Type } from '@model/model/type/type/type.model';

@Injectable()
export class TypeService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  async getAll(): Promise<Type[]> {
    return await Type.findAll();
  }
}
