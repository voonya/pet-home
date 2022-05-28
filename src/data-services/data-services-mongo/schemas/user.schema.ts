import { RoleEnum } from 'users/role.enum';
import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  surname: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop()
  sex: string;

  @Prop({
    required: true,
  })
  creationDate: Date;

  @Prop({
    required: true,
  })
  banned: boolean;

  @Prop()
  banReason: string;

  @Prop({
    required: true,
  })
  roles: RoleEnum[];
}

export const UserSchema = SchemaFactory.createForClass(User);
