import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService } from '@model/model/user/user/user.service';
import { Public } from '@utils/utils/auth/public.metadata';

@Controller('api/user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @Public()
  async login(@Query() query: any): Promise<any> {
    const code = query.code;
    return this.userService.login(code);
  }

  @Post('register')
  @Public()
  async register(@Body() body: any): Promise<any> {
    return await this.userService.regist(body);
  }

  @Get('info')
  async getUserInfo(@Req() req: any): Promise<any> {
    const user = req.user;
    return await this.userService.find(user.id);
  }

  @Get('test')
  async test(): Promise<any> {
    return { a: 666 };
  }
}
