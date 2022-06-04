import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'middlewares/logger';
import { ErrorResponse } from 'filters/error-response';
import { ValidatorErrorResponse } from 'filters/validator-error-response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    const { method, url } = request;
    let errorResponse: ErrorResponse = {
      timestamp: new Date().toISOString(),
      path: url,
      method: method,
      statusCode: status,
      error: exception.constructor.name,
      message: message,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;

      const validatorResponse =
        exception.getResponse() as ValidatorErrorResponse;

      if (validatorResponse) {
        errorResponse = {
          ...errorResponse,
          ...validatorResponse,
        };
      } else {
        errorResponse = {
          ...errorResponse,
          statusCode: status,
          error: exception.constructor.name,
          message: message,
        };
      }
    }

    const loggerService = new LoggerService(request.url);
    const stack = (exception as Error)?.stack ?? 'no stack';

    loggerService.error({ ...errorResponse, stack: stack });
    response.status(status).json(errorResponse);
  }
}
