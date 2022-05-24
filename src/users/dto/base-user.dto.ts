import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseUserDto {
  @MaxLength(75)
  @MinLength(2)
  @IsString()
  name: string;

  @MaxLength(75)
  @MinLength(2)
  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  sex?: string;
}
