import { BaseAnimalDto } from 'animals/dto/base-animal.dto';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AnimalDto extends BaseAnimalDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsMongoId()
  @IsNotEmpty()
  ownerId: string;

  @IsDate()
  @IsNotEmpty()
  creationDate: Date;
}
