import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@utils/utils/config/config.service';
import * as moment from 'moment/moment';
import * as assert from 'assert';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    assert(
      payload.exp && moment.unix(payload.exp).add(3, 'month').isAfter(moment()),
      '登录TOKEN已过期，请重新登录',
    );
    return payload;
  }
}
