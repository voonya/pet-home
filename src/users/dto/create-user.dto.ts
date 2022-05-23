import { IsDate, IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @Type(() => Date)
  @IsDate()
  readonly birthDate: Date;

  @IsString()
  readonly sex: string;
}
