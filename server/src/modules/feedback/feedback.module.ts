import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback, FeedbackSchema } from './feedback.schema';
import { JwtModule } from '@nestjs/jwt';
import { Claim, ClaimSchema } from 'src/modules/claim/claim.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }, {name: Claim.name, schema: ClaimSchema}]),JwtModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
