import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserTypeEnum } from 'users/user-type.enum';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop()
  userId: string;

  @Prop()
  creatorId: string;

  @Prop()
  userType: UserTypeEnum;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  rate: number;

  @Prop()
  created_date: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
