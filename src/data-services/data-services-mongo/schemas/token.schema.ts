import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  userId;

  @Prop({
    required: true,
  })
  tokens: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
