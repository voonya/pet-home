import { IsNumber, IsString } from 'class-validator';

export class PostFeedbackDto {
  @IsString()
  userType: string;

  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsNumber()
  rate: number;
}
