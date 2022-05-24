import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseApplicationDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MinLength(10)
  @MaxLength(240)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
