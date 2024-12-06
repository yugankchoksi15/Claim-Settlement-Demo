import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { RegisterDto } from 'src/modules/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createAdminUser(userInfo:RegisterDto): Promise<User> {
    // Create a new user instance
    const user = new this.userModel({
        firstName:userInfo.firstName,
        lastName: userInfo.lastName,
        email:userInfo.email,
        password:userInfo.password,
        role: 'admin'
      });
    
      // Save the user to the database
      const savedUser = await user.save();
    
      // Return the user and token
      return savedUser;
  }
}
