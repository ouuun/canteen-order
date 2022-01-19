import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { exceptionMessage } from '@utils/utils/filter/exception-message';
//import { Logger } from '@utils/utils/logger/logger.service';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const massage = exceptionMessage(exception);

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    // Logger.error(
    //   logFormat,
    //   exception instanceof Error ? (exception as Error).stack : null,
    // );
    Logger.error(
      logFormat,
      exception instanceof Error ? (exception as Error).stack : null,
      'AllExceptionsFilter',
    );

    //todo: 全局异常处理  返回值调整
    response.status(status).json({
      statusCode: status,
      msg: `${exception}`,
      massage: massage,
    });
  }
}
