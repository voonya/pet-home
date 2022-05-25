import { IsString } from 'class-validator';
import { BaseApplicationDto } from 'applications/dto/base-application.dto';

export class ApplicationDto extends BaseApplicationDto {
  @IsString()
  id: string;
}
