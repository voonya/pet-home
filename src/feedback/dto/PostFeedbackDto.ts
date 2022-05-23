import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Min,
  Max,
} from 'class-validator';

export class PostFeedbackDto {
  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsString()
  userId: string;

  @MaxLength(75)
  @MinLength(5)
  @IsString()
  title: string;

  @MaxLength(500)
  @MinLength(5)
  @IsString()
  body: string;

  @Max(10)
  @Min(0)
  @IsNumber()
  rate: number;
}
