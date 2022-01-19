import * as Log4js from 'log4js';

import * as path from 'path';

export class Logger {
  constructor() {
    console.log('logger init');
  }
  private static logger: any;

  static initLogger(app: string) {
    Log4js.configure(log4jsConfig(app));
    this.logger = Log4js.getLogger();
  }

  static trace(...args) {
    this.logger.trace(...args);
  }

  static debug(...args) {
    this.logger.debug(...args);
  }

  static log(...args) {
    this.logger.info(...args);
  }

  static info(...args) {
    this.logger.info(...args);
  }

  static warn(...args) {
    this.logger.warn(...args);
  }

  static warning(...args) {
    this.logger.warn(...args);
  }

  static error(...args) {
    this.logger.error(...args);
  }

  static fatal(...args) {
    this.logger.fatal(...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(args);
  }

  // // 日志追踪，可    // @ts-ignore以追溯到哪个文件、第几行第几列
  // static getStackTrace(deep = 2): string {
  //   const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
  //   const stackInfo: StackTrace.StackFrame = stackList[deep];
  //
  //   const lineNumber: number = stackInfo.lineNumber;
  //   const columnNumber: number = stackInfo.columnNumber;
  //   const fileName: string = stackInfo.fileName;
  //   const basename: string = Path.basename(fileName);
  //   return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  // }
}

function log4jsConfig(app: string): any {
  const baseLogPath = path.resolve(__dirname, '../../logs'); // 日志要写入哪个目录
  return {
    appenders: {
      console: {
        type: 'console', // 会打印到控制台
      },
      access: {
        type: 'dateFile', // 会写入文件，并按照日期分类
        filename: `${baseLogPath}/${app}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
        alwaysIncludePattern: true,
        pattern: 'yyyyMMdd',
        daysToKeep: 60,
        numBackups: 3,
        category: 'http',
        keepFileExt: true, // 是否保留文件后缀
      },
      app: {
        type: 'dateFile',
        filename: `${baseLogPath}/${app}/app-out/app.log`,
        alwaysIncludePattern: true,
        layout: {
          type: 'basic',
          // pattern:
          //   '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
        },
        // 日志文件按日期（天）切割
        pattern: 'yyyyMMdd',
        daysToKeep: 60,
        // maxLogSize: 10485760,
        numBackups: 3,
        keepFileExt: true,
      },
      errorFile: {
        type: 'dateFile',
        filename: `${baseLogPath}/${app}/errors/error.log`,
        alwaysIncludePattern: true,
        layout: {
          type: 'pattern',
          pattern:
            '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
        },
        // 日志文件按日期（天）切割
        pattern: 'yyyyMMdd',
        daysToKeep: 60,
        // maxLogSize: 10485760,
        numBackups: 3,
        keepFileExt: true,
      },
      errors: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'errorFile',
      },
    },
    categories: {
      default: {
        appenders: ['console', 'app', 'errors'],
        level: 'DEBUG',
      },
      info: { appenders: ['console', 'app', 'errors'], level: 'info' },
      access: { appenders: ['console', 'app', 'errors'], level: 'info' },
      http: { appenders: ['access'], level: 'DEBUG' },
    },
    pm2: true, // 使用 pm2 来管理项目时，打开
    pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  };
}
