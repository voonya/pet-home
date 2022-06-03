import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @MaxLength(30)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @MaxLength(30)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
