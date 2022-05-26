import { BaseAnimalDto } from 'animals/dto/base-animal.dto';

export class AnimalDto extends BaseAnimalDto {
  id: string;

  ownerId: string;

  creationDate: Date;
}
