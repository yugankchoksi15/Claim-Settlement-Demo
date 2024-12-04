import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './feedback.dto';
import { Feedback } from './feedback.schema';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('feedback')
@ApiTags('Feedback')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) 
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Submit feedback (NPS score)
  @Post()
  @ApiBody({ type: CreateFeedbackDto })  
  async submitFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    return this.feedbackService.submitFeedback(createFeedbackDto);
  }
}
