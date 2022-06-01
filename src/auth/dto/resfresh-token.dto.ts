import { IsNotEmpty, IsString } from 'class-validator';

export class ResfreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
