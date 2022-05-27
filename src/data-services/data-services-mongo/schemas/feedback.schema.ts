import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserTypeEnum } from 'users/user-type.enum';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  userId: string;

  @Prop({
    required: true,
  })
  creatorId: string;

  @Prop({
    required: true,
  })
  userType: UserTypeEnum;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  body: string;

  @Prop({
    required: true,
  })
  rate: number;

  @Prop({
    required: true,
  })
  created_date: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
