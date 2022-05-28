import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseRequestDto } from 'requests/dto/base-request.dto';

export class RequestDto extends BaseRequestDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsDate()
  creationDate: Date;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
