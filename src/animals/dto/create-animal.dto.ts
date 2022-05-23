import { AnimalType } from '@animals/animal-type';
import { IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly ownerId: string;

  readonly type: AnimalType;

  @IsString()
  readonly breed: string;

  @IsString()
  readonly description: string;
}
