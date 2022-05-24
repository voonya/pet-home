import { BaseAnimalDto } from '@animals/dto/base-animal.dto';
import { IsString } from 'class-validator';

export class CreateAnimalDto extends BaseAnimalDto {
  @IsString()
  ownerId: string;
}
