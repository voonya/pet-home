import { AnimalType } from '@animals/animal-type';
import { IsString } from 'class-validator';

export class UpdateAnimalDto {
  @IsString()
  readonly name: string;

  readonly type: AnimalType;

  @IsString()
  readonly breed: string;

  @IsString()
  readonly description: string;
}
