import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { UserType } from '@users/user-type';
export class PostFeedbackDto {
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @IsString()
  userId: string;

  @MaxLength(75)
  @MinLength(5)
  @IsString()
  title: string;

  @MaxLength(500)
  @MinLength(5)
  @IsString()
  body: string;

  @Max(10)
  @Min(0)
  @IsNumber()
  rate: number;
}
