import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RequestDocument = Requests & Document;

@Schema()
export class Requests {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true,
  })
  animal: mongoose.Schema.Types.ObjectId;

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
