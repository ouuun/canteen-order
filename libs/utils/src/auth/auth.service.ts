import { Injectable } from '@nestjs/common';
import { User } from '@model/model/user/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@utils/utils/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<any> {
    const payload = { name: user.name, id: user.id, test: '11' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string) {
    return this.jwtService.verify(token);
  }
}
