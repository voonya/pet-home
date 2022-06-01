import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'middlewares/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggerService = new LoggerService(req.url.slice(1).split('/')[0]);
    // const tempUrl = req.method + ' ' + req.url.split('?')[0];

    const headers = JSON.stringify(req.headers ?? {});
    const query = JSON.stringify(req.query ?? {});
    const body = JSON.stringify(req.body ?? {});
    const url = JSON.stringify(req.url ?? {});

    loggerService.log(
      `url: ${url}, headers: ${headers}, query: ${query}, body: ${body}`.replace(
        /\\/,
        '',
      ),
    );

    next();
  }
}