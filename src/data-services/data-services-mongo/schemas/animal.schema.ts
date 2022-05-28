import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AnimalTypeEnum } from 'animals/animal-type.enum';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  ownerId: string;

  @Prop({
    required: true,
  })
  type: AnimalTypeEnum;

  @Prop()
  age?: number;

  @Prop()
  breed?: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  creationDate: Date;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
