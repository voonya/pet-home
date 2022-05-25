import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { BaseRequestDto } from 'requests/dto/base-request.dto';

export class RequestDto extends BaseRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  creationDate: Date;
}
