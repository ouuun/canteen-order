import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '@utils/utils/logger/logger.service';

// 拦截器 返回值 日志
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        this.log(context, data);
        return {
          code: 200,
          data: Array.isArray(data) ? { list: data } : { info: data },
          message: '请求成功',
        };
        // return data;
      }),
    );
  }

  private log(context: ExecutionContext, data: any): void {
    const req = context.getArgByIndex(1).req;
    const logFormat = `  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:${JSON.stringify(
      data.data,
    )}  \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
    Logger.info(logFormat);
    Logger.access(logFormat);
  }
}
