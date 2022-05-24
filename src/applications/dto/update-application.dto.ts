import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(240)
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price?: number;
}
