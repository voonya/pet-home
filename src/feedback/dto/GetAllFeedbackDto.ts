import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllFeedbackDto {
  @IsString()
  @IsOptional()
  userType?: string;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
