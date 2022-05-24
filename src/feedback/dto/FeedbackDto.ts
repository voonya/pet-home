import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserType } from '@users/user-type';

export class Feedback {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

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
