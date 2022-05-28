import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseRequestDto } from 'requests/dto/base-request.dto';

export class RequestDto extends BaseRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  _id?: string;

  @IsDate()
  creationDate: Date;
}
