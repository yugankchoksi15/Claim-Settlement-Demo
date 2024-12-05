import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument, ClaimStatus } from './claim.schema';
import { ClaimAppealDto, CreateClaimDto } from './claim.dto';
import { paginate } from 'src/utils/paginator.util';
import { PaginationResult } from 'src/utils/paginator.util';

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
  async getClaimsByUserWithPagination(
    userId: string,
    page: number,
    limit: number,
  ): Promise<PaginationResult<Claim>> {
    const query = this.claimModel.find({ userId })
    .populate('repairCenter', 'name address city contactNumber') // Specify fields to populate
    .populate('feedback', 'score comments');
    return paginate(query, page, limit);
  }

  // Get a claim by its ID and validate ownership
  async getClaimByIdForUser(id: string, userId: string): Promise<Claim> {
    const claim = await this.claimModel.findOne({ _id: id, userId }).exec();
    if (!claim) {
      throw new NotFoundException(`Claim with ID "${id}" not found or access denied`);
    }
    return claim;
  }

  async getClaimsForApprovalWithPagination(
    page: number,
    limit: number,
  ): Promise<PaginationResult<Claim>> {
    const query = this.claimModel
      .find({
        status: { $in: [ClaimStatus.PENDING, ClaimStatus.APPEALED] }, // Use `$in` for multiple conditions
      })
      .populate('repairCenter', 'name address city contactNumber') // Specify fields to populate
      .populate('feedback', 'score comments') // Populate feedback

    return paginate(query,page,limit)
  }

  // Update a claim's status or details and validate ownership
  async updateClaimForAdmin(id: string, userId: string, updateInfo: Partial<Claim>): Promise<Claim> {
    const claim = await this.claimModel.findOneAndUpdate({ _id: id }, updateInfo, { new: true }).exec();
    if (!claim) {
      throw new NotFoundException(`Claim with ID "${id}" not found`);
    }
    return claim;
  }

  // Update a claim's status or details and validate ownership
  async updateClaimForUser(id: string, userId: string, updateInfo: ClaimAppealDto): Promise<Claim> {
    if(updateInfo.repairCenter){
      return this.updateRepairCenter(id,userId,updateInfo);
    } else {
      return this.updateStatusForUser(id,userId,updateInfo);
    }
  }

  async updateRepairCenter(id: string, userId: string, updateInfo: ClaimAppealDto){
    const claim = await this.claimModel.findOneAndUpdate({ _id: id, userId },{
      repairCenter:updateInfo.repairCenter
    }).exec();

    return claim;
  }

  async updateStatusForUser(id: string, userId: string, updateInfo: ClaimAppealDto){
    const claim = await this.claimModel.findOneAndUpdate({ _id: id, userId },{
      status:updateInfo.status
    }).exec();

    return claim;
  }
}
