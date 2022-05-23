import { AnimalType } from '@animals/animal-type';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly ownerId: string;

  @IsEnum(AnimalType)
  readonly type: AnimalType;

  @IsOptional()
  @IsString()
  readonly breed: string;

  @IsString()
  readonly description: string;
}
