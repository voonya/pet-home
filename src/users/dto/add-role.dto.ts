import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '@users/role.enum';

export class AddRoleDto {
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  readonly role: RoleEnum;

  @IsString()
  readonly userId: string;
}
