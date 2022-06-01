import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any) {
    const isValidObjectId = Types.ObjectId.isValid(value);

    if (!isValidObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
