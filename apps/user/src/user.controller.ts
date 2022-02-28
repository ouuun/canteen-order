import { Controller, Get } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '@utils/utils/auth/auth.service';
import { Public } from '@utils/utils/auth/public.metadata';
import { User } from '@model/model/user/user/user.model';
import { Request } from 'express';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Public()
  async getHello(): Promise<string> {
    const user = await User.findOne({ where: { id: 1 } });
    return await this.authService.login(user);
  }

  @Get('login')
  async test(@Req() req: Request): Promise<any> {
    return req.user;
  }
}
