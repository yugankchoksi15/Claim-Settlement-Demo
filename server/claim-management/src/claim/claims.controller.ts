// src/claims/claims.controller.ts

import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { ClaimsService } from './claims.service';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsService: ClaimsService) {}

  @Post('create')
  async createClaim(@Body('userId') userId: string, @Body('vehicleInfo') vehicleInfo: string) {
    return this.claimsService.createClaim(userId, vehicleInfo);
  }

  @Get(':claimId')
  async getClaimStatus(@Param('claimId') claimId: string) {
    return this.claimsService.getClaimStatus(claimId);
  }

  @Put(':claimId')
  async updateClaimStatus(@Param('claimId') claimId: string, @Body('status') status: string) {
    return this.claimsService.updateClaimStatus(claimId, status);
  }

  @Delete(':claimId')
  async cancelClaim(@Param('claimId') claimId: string) {
    return this.claimsService.cancelClaim(claimId);
  }

  @Put('feedback/:claimId')
  async provideFeedback(@Param('claimId') claimId: string, @Body('feedback') feedback: string) {
    return this.claimsService.provideFeedback(claimId, feedback);
  }
}
