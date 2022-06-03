import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'middlewares/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggerService = new LoggerService(req.url);

    const headers = JSON.stringify(req.headers ?? {});
    const query = JSON.stringify(req.query ?? {});
    const body = JSON.stringify(req.body ?? {});
    const { method, url } = req;

    loggerService.log(
      `${method} ${url}, headers: ${headers}, query: ${query}, body: ${body}`,
    );

    next();
  }
}
