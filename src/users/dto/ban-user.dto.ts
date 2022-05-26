import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BanUserDto {
  @MaxLength(500)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  readonly banReason: string;
}
