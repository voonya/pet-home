import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserTypeEnum } from 'users/user-type.enum';

export class Feedback {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  creatorId: string;

  @IsEnum(UserTypeEnum)
  @IsNotEmpty()
  userType: UserTypeEnum;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsDate()
  @IsNotEmpty()
  created_date: Date;
}
