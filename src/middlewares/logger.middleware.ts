import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'middlewares/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggerService = new LoggerService(req.url);

    const headers = req.headers ?? {};
    const query = req.query ?? {};
    const body = req.body ?? {};
    const { method, url } = req;

    loggerService.log({
      message: `METHOD: ${method} URL: ${url}`,
      method: method,
      url: url,
      headers: headers,
      query: query,
      body: body,
    });

    next();
  }
}
