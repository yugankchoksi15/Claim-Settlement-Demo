import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './claim.schema';
import { JwtModule } from '@nestjs/jwt';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserSchema } from 'src/modules/users/user.schema';
import { User } from 'src/modules/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema },{ name: User.name, schema: UserSchema }]),
    JwtModule
  ],
  controllers: [ClaimController],
  providers: [ClaimService],
  exports: [ClaimService], // Export service if needed in other modules
})
export class ClaimModule {}
