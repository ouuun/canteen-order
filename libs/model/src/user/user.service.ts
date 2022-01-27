import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from '@model/model/user/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  public async find(name: string): Promise<User> {
    return await User.findOne({ where: { name: name } });
  }
}
