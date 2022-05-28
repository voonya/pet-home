import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';

export class ApplicationDto extends BaseApplicationDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
