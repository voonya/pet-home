import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { BaseAnimalDto } from '@animals/dto/base-animal.dto';

export class AnimalDto extends BaseAnimalDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsDate()
  creationDate: Date;
}
