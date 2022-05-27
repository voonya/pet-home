import { BaseAnimalDto } from 'animals/dto/base-animal.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateAnimalDto extends BaseAnimalDto {
  @IsMongoId()
  @IsNotEmpty()
  ownerId: string;
}
