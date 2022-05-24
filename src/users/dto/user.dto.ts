import { IsDate, IsString } from 'class-validator';
import { BaseUserDto } from '@users/dto/base-user.dto';

export class UserDto extends BaseUserDto {
  @IsString()
  id: string;

  @IsDate()
  creationDate: Date;
}
