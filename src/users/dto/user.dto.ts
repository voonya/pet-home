import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsString()
  id: string;

  @MaxLength(75)
  @MinLength(5)
  @IsString()
  name: string;

  @MaxLength(75)
  @MinLength(5)
  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthDate?: Date;

  @IsDate()
  creationDate: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  sex?: string;
}
