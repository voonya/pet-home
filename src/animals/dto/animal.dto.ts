import { AnimalType } from '@animals/animal-type';
import { IsEnum, IsString } from 'class-validator';

export class AnimalDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  ownerId: string;

  @IsEnum(AnimalType)
  type: AnimalType;

  @IsString()
  breed: string;

  @IsString()
  description: string;
}
