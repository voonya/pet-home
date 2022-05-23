import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsString()
  sex: string;
}
