import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { UserTypeEnum } from 'users/user-type.enum';
import { PaginationDto } from 'pagination/dto/pagination.dto';

export class GetAllFeedbackDto extends PaginationDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  userType?: UserTypeEnum;
}
