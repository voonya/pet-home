import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly birthDate: Date;

  @IsOptional()
  @IsString()
  readonly sex: string;
}
