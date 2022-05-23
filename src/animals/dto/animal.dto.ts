import { AnimalType } from '@animals/animal-type';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AnimalDto {
  @IsString()
  id: string;

  @MaxLength(75)
  @MinLength(5)
  @IsString()
  name: string;

  @IsString()
  ownerId: string;

  @IsEnum(AnimalType)
  type: AnimalType;

  @MaxLength(75)
  @MinLength(5)
  @IsOptional()
  @IsString()
  breed: string;

  @MaxLength(500)
  @MinLength(5)
  @IsString()
  description: string;
}
