import { AnimalType } from '@animals/animal-type';

export class CreateAnimalDto {
  readonly name: string;

  readonly ownerId: string;

  readonly type: AnimalType;

  readonly breed: string;

  readonly description: string;
}
