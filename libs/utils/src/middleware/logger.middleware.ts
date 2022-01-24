import { ConsoleLogger, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';

//todo 调整为在 module 中使用
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerTsService) {
    //
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logging(req, res, this.logger);
    next();
  }

  private logging(req: Request, res: Response, logger: ConsoleLogger): void {
    const start = Date.now();
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = (chunk: any) => {
      chunks.push(Buffer.from(chunk));
      return oldWrite.apply(res, [chunk]);
    };

    res.end = (chunk) => {
      if (chunk) chunks.push(Buffer.from(chunk));

      let body = Buffer.concat(chunks).toString('utf8');
      const { method, originalUrl } = req;
      const { statusCode } = res;
      const elapsed = Date.now() - start;
      const user: any = req['user'];
      let contentLength = res.get('content-length') || 0;

      if (
        req.originalUrl === '/api/jinkeh/wxmp/qrcode/get' &&
        body.length > 4096
      ) {
        contentLength = Buffer.from(body).length;
        body = '<image buffer>';
      }

      let ip = req.ip;
      if (req.headers['x-forwarded-for']) {
        const forwarded = req.headers['x-forwarded-for'].toString().split(',');
        if (forwarded[0]) ip = forwarded[0];
      }

      let text = `${method} ${originalUrl} ${statusCode} ${elapsed}ms ${contentLength}b`;
      text += ` - ${user?.id || 'NA'} ${ip}`;
      text += ['POST', 'PUT'].includes(method)
        ? ` - ${JSON.stringify(req.body)}`
        : ' - NA';
      text += ` - ${this.outText(method, body)}`;

      logger.log(text);

      return oldEnd.apply(res, [chunk]);
    };
  }

  private outText(method: string, object: any, outLength = 100): string {
    const text = typeof object === 'string' ? object : JSON.stringify(object);
    if (method !== 'GET' || text.length <= outLength) return text;
    return `${text.substr(0, outLength)}...(${text.length})`;
  }
}
