import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema()
export class Application {
  @Prop({
    required: true,
  })
  requestId: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
