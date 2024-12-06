import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ClaimDocument = Claim & Document;

export enum ClaimStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  APPEALED = 'Appealed',
  CANCELED = 'Canceled',
  REPAIRED = 'Repaired',
}

export enum ClaimApprovalStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  REPAIRED = 'Repaired',
}

export enum ClaimAppealStatus {
  APPEALED = 'Appealed',
  CANCELED = 'Canceled',
}

@Schema({ timestamps: true })
export class Claim {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  yearOfManufacturing: number;

  @Prop({ required: true })
  vehicleNumber: string;

  @Prop({ default: 'Pending' })
  status: string;

  @Prop({ required: true })
  issueDescription: string;

  // Update repairCenter and feedback to be ObjectId references
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'RepairCenter', default: null })
  repairCenter: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feedback', default: null })
  feedback: MongooseSchema.Types.ObjectId | null;

  @Prop({ default: [] })
  documents: string[];

  @Prop({ default: null })
  submissionDate: Date;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);