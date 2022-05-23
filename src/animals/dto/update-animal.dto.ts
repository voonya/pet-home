import { AnimalType } from '@animals/animal-type';

export class UpdateAnimalDto {
  readonly name: string;

  readonly type: AnimalType;

  readonly breed: string;

  readonly description: string;
}
