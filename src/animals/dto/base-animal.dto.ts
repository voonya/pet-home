import { AnimalType } from '@animals/animal-type';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseAnimalDto {
  @MaxLength(75)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(AnimalType)
  type: AnimalType;

  @MaxLength(75)
  @MinLength(2)
  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @MaxLength(500)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  description: string;
}
