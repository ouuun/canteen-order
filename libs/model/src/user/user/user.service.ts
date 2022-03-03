import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AuthService } from '@utils/utils/auth/auth.service';
import { WechatService } from '@utils/utils/wechat/wechat.service';
import { User } from '@model/model/user/user/user.model';
import { LogHelper } from '@model/model/log/log/log-helper';
import { LOG_ACTION } from '@model/model/log/log/log.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection('connection') private readonly sequelize: Sequelize,
    private readonly authService: AuthService,
    private readonly wechatService: WechatService,
  ) {}

  public async login(code: string): Promise<any> {
    const { session_key, openid } = await this.wechatService.getOpenid(code);

    if (openid) {
      const user = await User.findOne({ where: { openid: openid } });
      if (user) return this.authService.login(user);
      else return { openid: openid };
    }
  }

  public async regist(data: any): Promise<any> {
    const { name, image, openid } = data;
    const user = User.build({ name: name, image: image, openid: openid });

    await this.sequelize.transaction(async (t) => {
      const options = await LogHelper.buildOptions(1, t);
      options.log.request.action = LOG_ACTION.add;
      options.log.request.note = '用户注册';
      await user.save(options);
    });
    return user;
  }

  public async find(id: number): Promise<User> {
    return await User.findOne({
      attributes: ['name', 'image'],
      where: { id: id },
    });
  }
}
