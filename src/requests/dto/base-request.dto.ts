import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  animalId: string;

  @IsString()
  @MinLength(10)
  @MaxLength(240)
  details: string;

  @IsString()
  @MinLength(10)
  @MaxLength(240)
  adress: string;

  @IsDate()
  @IsOptional()
  expirationDate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  assignedApplicationId?: string;
}
