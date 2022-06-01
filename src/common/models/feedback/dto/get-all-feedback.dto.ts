import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { UserTypeEnum } from 'common/models/users/user-type.enum';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';

export class GetAllFeedbackDto extends PaginationDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  userType?: UserTypeEnum;
}
