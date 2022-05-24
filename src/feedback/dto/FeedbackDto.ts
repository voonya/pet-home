import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Feedback {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsDate()
  @IsNotEmpty()
  created_date: Date;
}
