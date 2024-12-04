import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ required: true })
  userId: string; // Reference to the User

  @Prop({ required: true })
  claimId: string; // Reference to the Claim

  @Prop({ required: true })
  score: number; // NPS Score (0-10)

  @Prop({ required: true })
  comments: string; // Optional feedback text
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
