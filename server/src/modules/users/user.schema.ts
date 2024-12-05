// src/auth/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

// export type UserDocument = User & Document;
export type UserDocument = User & Document & { comparePassword: (candidatePassword: string) => Promise<boolean> };

export type UserRole = 'customer' | 'admin' | 'super-admin';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // This will be stored as a hashed password

  @Prop({ default: [] })
  claims: string[]; // Array of Claim IDs

  @Prop({ 
    type: String, 
    enum: ['customer', 'admin', 'super-admin'], 
    default: 'customer' 
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add Mongoose Middleware for password encryption
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
