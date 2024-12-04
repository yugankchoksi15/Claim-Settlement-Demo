import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';  // Import the guard
import { UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'your_jwt_secret',  // Make sure to replace this with an environment variable in production
      signOptions: { expiresIn: '1d' }, // You can adjust the expiration as needed
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // Add the JwtAuthGuard here
  exports: [JwtModule, JwtAuthGuard], // Export JwtModule and JwtAuthGuard so they can be used in other modules
})
export class AuthModule {}
