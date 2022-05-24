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

export class CreateUserDto {
  @MaxLength(75)
  @MinLength(2)
  @IsString()
  readonly name: string;

  @MaxLength(75)
  @MinLength(2)
  @IsString()
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly birthDate?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly sex?: string;
}
