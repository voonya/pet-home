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
          format: combine(
            nestWinstonModuleUtilities.format.nestLike('PetHome', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'api.log',
          dirname: 'logs/info',
          format: json(),
        }),
        new winston.transports.File({
          level: 'error',
          filename: 'errors.log',
          dirname: 'logs/error',
          format: json(),
        }),
      ],
    });
  }

  log(message: string | object) {
    this.logger.info(message);
  }

  error(message: string | object) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warning(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
