import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './feedback.dto';
import { Feedback } from './feedback.schema';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Submit feedback (NPS score)
  @Post()
  async submitFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    return this.feedbackService.submitFeedback(createFeedbackDto);
  }

  // Get feedback for a specific claim
  @Get('claim/:claimId')
  async getFeedbackByClaimId(@Param('claimId') claimId: string): Promise<Feedback[]> {
    return this.feedbackService.getFeedbackByClaimId(claimId);
  }
}
