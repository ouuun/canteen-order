import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';

// 拦截器 返回值 日志
@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerTsService) {
    //
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        this.logger.log(this.buildLog(context, data), 'system');
        return data;
      }),
    );
  }

  private buildLog(context: ExecutionContext, data: any): string {
    const req = context.getArgByIndex(1).req;
    const res = context.getArgByIndex(0).res;
    const { originalUrl, method, ip, user, body } = req;
    const { statusCode } = res;

    let log = user ? `${user.id}` : `NA`;
    log += ` - ${ip} ${method} ${originalUrl} ${statusCode}`;
    log += ['POST', 'PUT'].includes(method)
      ? ` - ${JSON.stringify(body)}`
      : ' - NA';
    log += ` - ${JSON.stringify(data)}`;

    return log;
  }
}
