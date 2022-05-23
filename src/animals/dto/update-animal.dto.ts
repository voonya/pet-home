import { AnimalType } from '@animals/animal-type';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAnimalDto {
  @MaxLength(75)
  @MinLength(5)
  @IsString()
  readonly name: string;

  @IsEnum(AnimalType)
  readonly type: AnimalType;

  @MaxLength(75)
  @MinLength(5)
  @IsOptional()
  @IsString()
  readonly breed: string;

  @MaxLength(500)
  @MinLength(5)
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  age?: number;
}
