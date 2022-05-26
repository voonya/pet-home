import { BaseUserDto } from 'users/dto/base-user.dto';
import { RoleEnum } from 'users/role.enum';

export class UserDto extends BaseUserDto {
  id: string;

  creationDate: Date;

  banned: boolean;

  banReason?: string;

  roles: RoleEnum[];
}
