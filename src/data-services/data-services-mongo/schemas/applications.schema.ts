import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

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
