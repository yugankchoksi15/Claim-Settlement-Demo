import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepairCenterDocument = RepairCenter & Document;

@Schema({ timestamps: true })
export class RepairCenter {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string; // Physical address of the repair center

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ default: [] })
  claimsServed: string[]; // Array of Claim IDs
}

export const RepairCenterSchema = SchemaFactory.createForClass(RepairCenter);