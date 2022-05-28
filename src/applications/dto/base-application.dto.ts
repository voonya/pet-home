import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class BaseApplicationDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsString()
  @MinLength(10)
  @MaxLength(240)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
