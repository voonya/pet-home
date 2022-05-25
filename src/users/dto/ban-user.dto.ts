import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BanUserDto {
  @IsString()
  readonly userId: string;

  @MaxLength(500)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  readonly banReason: string;
}
