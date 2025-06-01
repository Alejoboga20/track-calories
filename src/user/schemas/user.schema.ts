import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PhysicalActivity, Objective } from '../enums/user.enums';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: PhysicalActivity })
  physicalActivity: PhysicalActivity;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true, enum: Objective })
  objective: Objective;

  @Prop({ required: true, unique: true })
  apiKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
