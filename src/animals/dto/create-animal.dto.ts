import { AnimalType } from '../animal-type';

export class CreateAnimalDto {
  readonly name: string;

  readonly ownerId: string;

  readonly type: AnimalType;

  readonly breed: string;

  readonly description: string;
}
