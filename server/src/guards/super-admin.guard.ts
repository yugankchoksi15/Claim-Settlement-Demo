import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/users/user.schema';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel('User') private userModel: Model<UserDocument>, // Ensure User schema is registered
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userPayload = request.user; // Assumes `user` is set in the request by a preceding middleware or guard

    if (!userPayload || !userPayload.email) {
      throw new ForbiddenException('Access denied: Invalid user payload');
    }

    // Fetch user from the database
    const user = await this.userModel.findOne({ email: userPayload.email });

    if (!user) {
      throw new ForbiddenException('Access denied: User not found');
    }

    // Check if the user has 'admin' or 'super-admin' role
    if (!['super-admin'].includes(user.role)) {
      throw new ForbiddenException('Access denied: Super Admins only');
    }

    return true;
  }
}