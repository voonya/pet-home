import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostFeedbackDto {
  @IsString()
  @IsNotEmpty()
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
