// repair-center.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepairCenter, RepairCenterDocument } from './repair-center-schema';
import { CreateRepairCenterDto } from './repair-center-dto';

@Injectable()
export class RepairCenterService {
  constructor(
    @InjectModel(RepairCenter.name) private repairCenterModel: Model<RepairCenterDocument>,
  ) {}

  // Create a new repair center
  async createRepairCenter(createRepairCenterDto: CreateRepairCenterDto): Promise<RepairCenter> {
    const createdRepairCenter = new this.repairCenterModel(createRepairCenterDto);
    return createdRepairCenter.save();
  }

  // Get a repair center by its ID
  async getRepairCenterById(id: string): Promise<RepairCenter> {
    const repairCenter = await this.repairCenterModel.findById(id).exec();
    if (!repairCenter) {
      throw new Error('Repair center not found');
    }
    return repairCenter;
  }

  // Add a claim ID to the repair center's claimsServed array
//   async addClaimServed(repairCenterId: string, addClaimServedDto: AddClaimServedDto): Promise<RepairCenter> {
//     const { claimId } = addClaimServedDto;
//     const repairCenter = await this.repairCenterModel.findById(repairCenterId).exec();
//     if (!repairCenter) {
//       throw new Error('Repair center not found');
//     }

//     // Check if claimId already exists in the claimsServed array
//     if (repairCenter.claimsServed.includes(claimId)) {
//       throw new Error('Claim ID is already added to this repair center');
//     }

//     // Add the new claimId
//     repairCenter.claimsServed.push(claimId);
//     return repairCenter.save();
//   }

  async getAllRepairCenters(): Promise<RepairCenter[]> {
    return this.repairCenterModel.find().exec();
  }
}
