// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/user.schema'; // Import User and UserDocument
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const user = new this.userModel({ firstName, lastName, email, password });
    return user.save();
  }

  async login(email: string, password: string): Promise<string> {
    // Find the user by email
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    // Cast the document to UserDocument to access the methods defined on the schema
    const userDoc = user as UserDocument; // TypeScript now recognizes comparePassword

    // Compare the passwords using comparePassword method
    const isPasswordValid = await userDoc.comparePassword(password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    // Generate a JWT token for the user
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  // validateUser method is another way to validate credentials
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
