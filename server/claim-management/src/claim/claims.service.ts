// src/claims/claims.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from './claim.schema';
// import { Claim, ClaimDocument } from './schemas/claim.schema';

@Injectable()
export class ClaimsService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<ClaimDocument>) {}

  async createClaim(userId: string, vehicleInfo: string): Promise<Claim> {
    const claim = new this.claimModel({ userId, vehicleInfo, status: 'submitted', submissionDate: new Date() });
    return claim.save();
  }

  async getClaimStatus(claimId: string): Promise<Claim | null> {
    return this.claimModel.findById(claimId);
  }

  async updateClaimStatus(claimId: string, status: string): Promise<Claim | null> {
    return this.claimModel.findByIdAndUpdate(claimId, { status }, { new: true });
  }

  async cancelClaim(claimId: string): Promise<Claim | null> {
    return this.claimModel.findByIdAndDelete(claimId);
  }

  async provideFeedback(claimId: string, feedback: string): Promise<Claim | null> {
    return this.claimModel.findByIdAndUpdate(claimId, { feedback }, { new: true });
  }
}
