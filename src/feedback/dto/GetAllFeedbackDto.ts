import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from '@users/user-type';
export class GetAllFeedbackDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
