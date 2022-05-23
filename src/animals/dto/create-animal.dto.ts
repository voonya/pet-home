import { AnimalType } from '@animals/animal-type';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAnimalDto {
  @MaxLength(75)
  @MinLength(5)
  @IsString()
  readonly name: string;

  @IsString()
  readonly ownerId: string;

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
}
