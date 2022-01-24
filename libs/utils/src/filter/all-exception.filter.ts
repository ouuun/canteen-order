import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { exceptionMessage } from '@utils/utils/filter/exception-message';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerTsService) {
    this.logger.log('AllExceptionsFilter initialized', 'AllExceptionsFilter');
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse(); // 用来发送 异常信息
    const request = ctx.getRequest(); // 获取requeest参数？

    const message = exceptionMessage(exception);
    if (request.url.indexOf('/apidoc') !== 0) {
      this.logger.error(
        message,
        exception instanceof Error ? (exception as Error).stack : null,
        'AllExceptionsFilter',
      );
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception instanceof Error ? message : exception,
    });
  }
}
