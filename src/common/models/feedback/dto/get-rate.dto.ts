import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { UserTypeEnum } from 'common/models/users/user-type.enum';

export class GetRateDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  userType?: UserTypeEnum;
}
