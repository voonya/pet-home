import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestQueryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  animalId?: string;
}
