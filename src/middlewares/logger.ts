import { LoggerService as LS } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const { errors, combine, json, timestamp } = winston.format;

export class LoggerService implements LS {
  private readonly logger: winston.Logger;

  constructor(url: string) {
    const service = url.slice(1).split('/')[0];

    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
      ),
      defaultMeta: { service },
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: combine(nestWinstonModuleUtilities.format.nestLike()),
        }),
        new winston.transports.File({
          filename: 'api.log',
          dirname: 'logs/info',
        }),
        new winston.transports.File({
          level: 'error',
          filename: 'errors.log',
          dirname: 'logs/error',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(this.sanitize(message));
  }

  error(message: string) {
    this.logger.error(this.sanitize(message));
  }

  warn(message: string) {
    this.logger.warning(this.sanitize(message));
  }

  debug(message: string) {
    this.logger.debug(this.sanitize(message));
  }

  verbose(message: string) {
    this.logger.verbose(this.sanitize(message));
  }

  private sanitize(message: string) {
    return message.replace(/\\/, '');
  }
}
