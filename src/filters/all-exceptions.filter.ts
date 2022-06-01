import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'middlewares/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception.constructor.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = (exception as Error).message;
    }

    const { method, url } = request;
    const errorResponse = {
      timestamt: new Date().toISOString(),
      path: url,
      method: method,
      statusCode: status,
      error: message,
    };

    const loggerService = new LoggerService(request.url.slice(1).split('/')[0]);
    const stack = (exception as Error).stack ?? 'no stack';
    loggerService.error(
      `${method} ${status} url: ${url}, msg: ${message}, stack: ${stack}`.replace(
        /\\/,
        '',
      ),
    );

    response.status(status).json(errorResponse);
  }
}
