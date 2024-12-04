import { Controller, Get, Post, Put, Body, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Claim } from './claim.schema';
import { ClaimService } from './claim.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClaimDto, UpdateClaimDto } from './claim.dto';

@Controller('claim')
@ApiTags('Claim')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) 
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  @ApiBody({ type: CreateClaimDto })  
  async createClaim(@Body() claim:CreateClaimDto, @Req() req: any): Promise<Claim> {
    console.log(req.user)
    return this.claimService.createClaim({ ...claim, userId:req.user.id });
  }

  @Get()
  async getClaimsForUser(@Req() req: any): Promise<Claim[]> {
    return this.claimService.getClaimsByUser(req.user.id);
  }

  // Get a specific claim by its ID (only if it belongs to the user)
  @Get(':id')
  async getClaimById(@Param('id') id: string, @Req() req: any): Promise<Claim> {
    const userId = req.user.id; // Extract user ID from token
    return this.claimService.getClaimByIdForUser(id, userId);
  }

  // Update a claim (e.g., status or details, only if it belongs to the user)
  @Put(':id')
  async updateClaim(@Param('id') id: string, @Body() update: UpdateClaimDto, @Req() req: any): Promise<Claim> {
    return this.claimService.updateClaimForUser(id, req.user.id, update);
  }
}
