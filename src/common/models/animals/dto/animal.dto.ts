import { BaseAnimalDto } from 'common/models/animals/dto/base-animal.dto';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AnimalDto extends BaseAnimalDto {
  @IsMongoId()
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
