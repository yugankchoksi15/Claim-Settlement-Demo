import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepairCentreDocument = RepairCentre & Document;

@Schema()
export class RepairCentre {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  services: string[];
}

export const RepairCentreSchema = SchemaFactory.createForClass(RepairCentre);
