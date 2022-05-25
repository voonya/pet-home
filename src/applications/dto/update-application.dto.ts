import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
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
  @Min(0)
  price?: number;
}
