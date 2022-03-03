import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.metadata';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { AuthService } from '@utils/utils/auth/auth.service';

@Injectable()
export class MyAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: LoggerTsService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    await this.verifyToken(request);

    return true;
  }

  private async verifyToken(request: any) {
    if (request.headers.authorization !== undefined) {
      const token = request.headers.authorization.replace('Bearer ', '');
      //verify 校验成功:返回payload,校验失败:抛出对应错误
      request.user = await this.authService.verify(token);
    }
  }
}
