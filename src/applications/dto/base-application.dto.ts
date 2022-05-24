import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseApplicationDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
