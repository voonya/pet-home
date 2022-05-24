import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  readonly offset?: number;

  @IsNumber()
  @IsOptional()
  readonly limit?: number;
}
