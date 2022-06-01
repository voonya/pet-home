import { BaseUserDto } from 'common/models/users/dto/base-user.dto';
import { RoleEnum } from 'common/models/users/role.enum';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto extends BaseUserDto {
  @IsMongoId()
  @IsString()
  @IsOptional()
  _id?: string;

  @IsDate()
  @IsNotEmpty()
  creationDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  banned: boolean;

  @MaxLength(500)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  banReason?: string;

  roles: RoleEnum[];
}
