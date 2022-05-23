import { AnimalType } from '@animals/animal-type';
import { IsEnum, IsString } from 'class-validator';

export class UpdateAnimalDto {
  @IsString()
  readonly name: string;

  @IsEnum(AnimalType)
  readonly type: AnimalType;

  @IsString()
  readonly breed: string;

  @IsString()
  readonly description: string;
}
