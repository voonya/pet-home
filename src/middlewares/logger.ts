import * as winston from 'winston';

const { json, timestamp } = winston.format;

export class LoggerService {
  private readonly logger: winston.Logger;

  constructor(url: string) {
    const service = url.slice(1).split('/')[0];

    this.logger = winston.createLogger({
      format: timestamp({ format: 'isoDateTime' }),
      defaultMeta: { service },
      transports: [
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
}
