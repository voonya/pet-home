import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PagingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.query.offset = (req.query.offset || 0) as string;
    req.query.limit = (req.query.limit || 10) as string;
    next();
  }
}
