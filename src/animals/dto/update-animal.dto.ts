import { AnimalType } from '@animals/animal-type';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateAnimalDto {
  @IsString()
  readonly name: string;

  @IsEnum(AnimalType)
  readonly type: AnimalType;

  @IsOptional()
  @IsString()
  readonly breed: string;

  @IsString()
  readonly description: string;
}
