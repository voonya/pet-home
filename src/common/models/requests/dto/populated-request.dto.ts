import {
  IsMongoId,
  IsOptional,
  IsDate,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import mongoose from 'mongoose';

export class PopulatedRequestDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsDate()
  creationDate: Date;

  user: mongoose.Schema.Types.ObjectId;

  animal: mongoose.Schema.Types.ObjectId;

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
