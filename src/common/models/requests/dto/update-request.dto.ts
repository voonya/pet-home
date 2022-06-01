import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(240)
  details?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  assignedApplicationId?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  expirationDate?: Date;
}
