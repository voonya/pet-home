import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Requests & Document;

@Schema()
export class Requests {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  animalId: string;

  @Prop({
    required: true,
  })
  details: string;

  @Prop({
    required: true,
  })
  adress: string;

  @Prop()
  expirationDate: Date;

  @Prop()
  assignedApplicationId: string;

  @Prop({
    required: true,
  })
  creationDate: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Requests);
