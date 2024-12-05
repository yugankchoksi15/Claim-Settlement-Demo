import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './modules/users/user.schema'; // Import your User schema

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // Create a super-admin user
  async seedSuperAdmin() {
    const existingUser = await this.userModel.findOne({ email: process.env.SUPER_ADMIN_EMAIL });

    if (!existingUser) {
    
      const newUser = new this.userModel({
        firstName: process.env.SUPER_ADMIN_FNAME,
        lastName: process.env.SUPER_ADMIN_LNAME,
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        role:'super-admin'
      });
      await newUser.save();

      console.log('Super-Admin user created!');
    } else {
      console.log('Super-Admin user already exists!');
    }
  }

  async runSeeder() {
    await this.seedSuperAdmin();
    console.log('Seeding completed!');
  }
}