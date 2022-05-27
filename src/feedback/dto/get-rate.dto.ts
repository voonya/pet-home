import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserTypeEnum } from 'users/user-type.enum';

export class GetRateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  userType?: UserTypeEnum;
}
