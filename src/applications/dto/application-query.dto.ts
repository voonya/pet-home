import { IsOptional, IsString } from 'class-validator';

export class ApplicationQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  requestId?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
