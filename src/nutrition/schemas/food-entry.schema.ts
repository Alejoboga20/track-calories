import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FoodEntryDocument = FoodEntry & Document;

@Schema({ collection: 'foods', timestamps: true })
export class FoodEntry {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  dish: string;

  @Prop({ required: true })
  protein: number;

  @Prop({ required: true })
  carbs: number;

  @Prop({ required: true })
  fat: number;

  @Prop({ required: true })
  calories: number;
}

export const FoodEntrySchema = SchemaFactory.createForClass(FoodEntry);
