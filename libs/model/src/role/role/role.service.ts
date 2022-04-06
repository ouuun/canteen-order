import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RoleService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}
}
