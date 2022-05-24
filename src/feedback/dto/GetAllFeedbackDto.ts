import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserType } from '@users/user-type';
import { PaginationDto } from 'pagination/dto/pagination.dto';
export class GetAllFeedbackDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;
}
