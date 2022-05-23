import { IsDate, IsEmail, IsString } from 'class-validator';
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

  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsString()
  sex: string;
}
