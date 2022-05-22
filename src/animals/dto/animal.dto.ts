import { AnimalType } from '../animal-type';

export class AnimalDto {
  id: string;

  name: string;

  ownerId: string;

  type: AnimalType;

  breed: string;

  description: string;
}
