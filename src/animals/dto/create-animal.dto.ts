import { BaseAnimalDto } from '@animals/dto/base-animal.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimalDto extends BaseAnimalDto {
  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
