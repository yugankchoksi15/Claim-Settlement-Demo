import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument, ClaimStatus } from './claim.schema';
import { CreateClaimDto } from './claim.dto';

@Injectable()
export class ClaimService {
  constructor(@InjectModel('Claim') private readonly claimModel: Model<ClaimDocument>) {}

  // Create a new claim
  async createClaim(claimInfo: CreateClaimDto, userId:string): Promise<Claim> {
    const newClaim = new this.claimModel({
      ...claimInfo,
      userId,
      submissionDate: new Date(),
    });
    return newClaim.save();
  }

  // Get all claims by a specific user
  async getClaimsByUser(userId: string): Promise<Claim[]> {
    return this.claimModel.find({ userId })
      .populate('repairCenter', 'name address city contactNumber')  // Specify fields to populate
      .populate('feedback', 'score comments') // Populating feedback as before
      .exec();
  }

  // Get a claim by its ID and validate ownership
  async getClaimByIdForUser(id: string, userId: string): Promise<Claim> {
    const claim = await this.claimModel.findOne({ _id: id, userId }).exec();
    if (!claim) {
      throw new NotFoundException(`Claim with ID "${id}" not found or access denied`);
    }
    return claim;
  }

  // Update a claim's status or details and validate ownership
  async updateClaimForUser(id: string, userId: string, updateDto: Partial<Claim>): Promise<Claim> {
    const claim = await this.claimModel.findOneAndUpdate({ _id: id, userId }, updateDto, { new: true }).exec();
    if (!claim) {
      throw new NotFoundException(`Claim with ID "${id}" not found or access denied`);
    }
    return claim;
  }

  // Cancel a claim (only if it belongs to the user)
  async cancelClaimForUser(id: string, userId: string): Promise<Claim> {
    return this.updateClaimForUser(id, userId, { status: ClaimStatus.CANCELED });
  }

  // Appeal a rejected claim (only if it belongs to the user)
  async appealClaimForUser(id: string, userId: string): Promise<Claim> {
    const claim = await this.getClaimByIdForUser(id, userId);
    if (claim.status !== ClaimStatus.REJECTED) {
      throw new ForbiddenException('Only rejected claims can be appealed');
    }
    return this.updateClaimForUser(id, userId, { status: ClaimStatus.APPEALED });
  }
}
