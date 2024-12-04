import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ required: true, min: 0, max: 10 })
  score: number; // NPS Score (0-10)

  @Prop({ required: true })
  comments: string; // Feedback text
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
