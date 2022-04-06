import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}
}
