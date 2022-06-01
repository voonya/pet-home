import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleEnum } from 'common/models/users/role.enum';

export class AddRoleDto {
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  readonly role: RoleEnum;
}
