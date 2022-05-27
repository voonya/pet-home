import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AnimalTypeEnum } from 'animals/animal-type.enum';
import { randomUUID } from 'crypto';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
  @Prop({ type: String, default: () => randomUUID() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  ownerId: string;

  @Prop()
  type: AnimalTypeEnum;

  @Prop()
  age?: number;

  @Prop()
  breed?: string;

  @Prop()
  description: string;

  @Prop()
  creationDate: Date;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
