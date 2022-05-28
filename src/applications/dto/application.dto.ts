import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';

export class ApplicationDto extends BaseApplicationDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
