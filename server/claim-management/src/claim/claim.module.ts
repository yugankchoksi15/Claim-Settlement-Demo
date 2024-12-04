import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './claim.schema';
import { ClaimController } from './claims.controller';
import { ClaimService } from './claims.service';
import { JwtModule } from '@nestjs/jwt';
// import { ClaimService } from './claim.service';
// import { ClaimController } from './claim.controller';

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
