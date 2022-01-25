import { Controller, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@model/model/user/user.model';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { LOG_ACTION } from '@model/model/log/log/log.interface';
import { LogHelper } from '@model/model/log/log/log-helper';

@Controller('test')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection('connection') private readonly sequelize: Sequelize,
  ) {}

  @Post()
  async getHello(@Query() query: any): Promise<any> {
    const user = await User.build({ name: 'test', password: 'test' });

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(1, t);
      options.log.request.action = LOG_ACTION.update;
      options.log.request.note = 'test';

      await user.save(options);
    });
    return user;
  }
}
