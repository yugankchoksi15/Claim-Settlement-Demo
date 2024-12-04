import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './claim.schema';
import { JwtModule } from '@nestjs/jwt';
import { ClaimController } from './claims.controller';
import { ClaimService } from './claims.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema },]),
    JwtModule
  ],
  controllers: [ClaimController],
  providers: [ClaimService],
  exports: [ClaimService], // Export service if needed in other modules
})
export class ClaimModule {}
