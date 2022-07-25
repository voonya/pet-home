import { IsDate, IsMongoId, IsOptional } from 'class-validator';
import { BaseRequestDto } from 'common/models/requests/dto/base-request.dto';
import mongoose from 'mongoose';

export class RequestDto extends BaseRequestDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsDate()
  creationDate: Date;

  @IsMongoId()
  user: mongoose.Types.ObjectId;
}
