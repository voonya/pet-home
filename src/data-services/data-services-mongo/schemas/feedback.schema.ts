import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserTypeEnum } from 'users/user-type.enum';
import { v4 as uuidv4 } from 'uuid';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({
    required: true,
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
