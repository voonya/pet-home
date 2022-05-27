import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { RoleEnum } from 'users/role.enum';

export class AddRoleDto {
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  readonly role: RoleEnum;

  @IsNotEmpty()
  @IsMongoId()
  readonly userId: string;
}
