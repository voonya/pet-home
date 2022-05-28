import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Requests & Document;

@Schema()
export class Requests {
  @Prop()
  userId: string;

  @Prop()
  animalId: string;

  @Prop()
  details: string;

  @Prop()
  adress: string;

  @Prop()
  expirationDate?: Date;

  @Prop()
  assignedApplicationId?: string;

  @Prop()
  creationDate: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Requests);
