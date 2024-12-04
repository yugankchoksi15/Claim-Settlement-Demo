import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './feedback.schema';
import { CreateFeedbackDto } from './feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  // Submit feedback (NPS)
  async submitFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = new this.feedbackModel(createFeedbackDto);
    return createdFeedback.save();
  }

  // Get feedback for a specific claim
  async getFeedbackByClaimId(claimId: string): Promise<Feedback[]> {
    return this.feedbackModel.find({ claimId }).exec();
  }
}
