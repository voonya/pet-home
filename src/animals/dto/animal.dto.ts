import { AnimalType } from '@animals/animal-type';
import { IsString } from 'class-validator';

export class AnimalDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  ownerId: string;

  type: AnimalType;

  @IsString()
  breed: string;

  @IsString()
  description: string;
}
