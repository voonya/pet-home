import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AnimalTypeEnum } from 'animals/animal-type.enum';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
  @Prop()
  id: string;

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
