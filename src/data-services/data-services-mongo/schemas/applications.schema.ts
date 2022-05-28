import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema()
export class Application {
  @Prop()
  requestId: string;

  @Prop()
  userId: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
