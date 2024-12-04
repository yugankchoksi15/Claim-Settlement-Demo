// src/claims/schemas/claim.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimDocument = Claim & Document;

@Schema({ timestamps: true })
export class Claim {
  @Prop({ required: true })
  userId: string; // Refers to the user who made the claim

  @Prop({ required: true })
  vehicleInfo: string; // Vehicle details

  @Prop({ required: true })
  status: string; // Claim status

  @Prop({ required: true })
  submissionDate: Date;

  @Prop({ default: null })
  repairCentre: string | null; // Assigned repair centre

  @Prop({ default: '' })
  feedback: string; // User feedback
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
