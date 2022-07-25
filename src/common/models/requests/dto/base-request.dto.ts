import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';

export class BaseRequestDto {
  @IsMongoId()
  animal: mongoose.Types.ObjectId;

  @IsString()
  @MinLength(10)
  @MaxLength(240)
  details: string;

  @IsString()
  @MinLength(10)
  @MaxLength(240)
  adress: string;

  @IsDate()
  @IsOptional()
  expirationDate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  assignedApplicationId?: string;
}
