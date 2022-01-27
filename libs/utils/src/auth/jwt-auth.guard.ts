import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.metadata';
import { Observable } from 'rxjs';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { exceptionMessage } from '@utils/utils/filter/exception-message';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: LoggerTsService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let a1 = false;

    try {
      const a = super.canActivate(context);
      if (typeof a === 'boolean') a1 = a;
      else if (a instanceof Promise) a1 = await a;
      else if (a instanceof Observable) a1 = await a.toPromise();
    } catch (e) {
      if (isPublic && exceptionMessage(e) === 'Unauthorized') return true;
      throw e;
    }

    return a1 || isPublic;
  }
}
