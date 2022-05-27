import { BaseAnimalDto } from 'animals/dto/base-animal.dto';

export class AnimalDto extends BaseAnimalDto {
  _id?: string;

  ownerId: string;

  creationDate: Date;
}
