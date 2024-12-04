import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimDocument = Claim & Document;

export enum ClaimStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  APPEALED = 'Appealed',
  CANCELED = 'Canceled',
  REPAIRED = 'Repaired',
}

@Schema({ timestamps: true })
export class Claim {
  @Prop({ required: true })
  userId: string; // Reference to the User

  @Prop({ required: true })
  model: string; // Vehicle model

  @Prop({ required: true })
  company: string; // Vehicle company

  @Prop({ required: true })
  yearOfManufacturing: number; // Year of manufacturing

  @Prop({ required: true })
  vehicleNumber: string; // Vehicle registration number

  @Prop({ default: ClaimStatus.PENDING })
  status: ClaimStatus;

  @Prop({ required: true })
  issueDescription: string;

  @Prop({ default: null })
  repairCenter: string | null; // Selected repair center ID

  @Prop({ default: [] })
  documents: string[]; // Array of file paths or URLs for claim/policy documents

  @Prop({ default: null })
  feedback: string | null; // Feedback from user

  @Prop({ default: null })
  submissionDate: Date;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);