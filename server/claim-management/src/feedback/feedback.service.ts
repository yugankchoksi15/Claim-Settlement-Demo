import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './feedback.schema';
import { CreateFeedbackDto } from './feedback.dto';
import { Claim } from 'src/claim/claim.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    @InjectModel(Claim.name) private readonly claimModel: Model<Claim>,
  ) {}

  // Submit feedback (NPS)
  async submitFeedback(feedbackInfo: CreateFeedbackDto): Promise<Feedback> {
    // Step 1: Create and save the feedback
    const createdFeedback = new this.feedbackModel(feedbackInfo);
    await createdFeedback.save();
  
    // Step 2: Find the claim by the claimId and associate the feedback
    const claim = await this.claimModel.findById(feedbackInfo.claimId);
    
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    claim.feedback = createdFeedback.id
    await claim.save();  // Save the updated claim
  
    // Step 4: Return the created feedback
    return createdFeedback;
  }

  // Get feedback for a specific claim
  async getFeedbackByClaimId(claimId: string): Promise<Feedback[]> {
    return this.feedbackModel.find({ claimId }).exec();
  }
}
