import { Controller, Get, Post, Put, Body, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Claim, ClaimStatus } from './claim.schema';
import { ClaimService } from './claims.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed

@Controller('claims')
// @UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {
  console.log("my claim controller =============> ")

  }

  // Create a new claim
  @Post()
  async createClaim(@Body() claimDto: Partial<Claim>, @Req() req: any): Promise<Claim> {
    // const userId = req.user.id; // Extract user ID from token
    const userId = "674ff4feb35927cd75734ace"; // Extract user ID from token
    return this.claimService.createClaim({ ...claimDto, userId });
  }

  // Get all claims for the authenticated user
  @Get()
  async getClaimsForUser(@Req() req: any): Promise<Claim[]> {
    console.log("in the get claim ============> ")
    // const userId = req.user.id;
    const userId = "674ff4feb35927cd75734ace"; // Extract user ID from token
     // Extract user ID from token
    console.log("userId ==========> ", userId)
    return this.claimService.getClaimsByUser(userId);
  }

  // Get a specific claim by its ID (only if it belongs to the user)
  @Get(':id')
  async getClaimById(@Param('id') id: string, @Req() req: any): Promise<Claim> {
    const userId = req.user.id; // Extract user ID from token
    return this.claimService.getClaimByIdForUser(id, userId);
  }

  // Update a claim (e.g., status or details, only if it belongs to the user)
  @Put(':id')
  async updateClaim(@Param('id') id: string, @Body() updateDto: Partial<Claim>, @Req() req: any): Promise<Claim> {
    // const userId = req.user.id; // Extract user ID from token
    const userId = "674ff4feb35927cd75734ace"; // Extract user ID from token
    return this.claimService.updateClaimForUser(id, userId, updateDto);
  }

  // Cancel a claim (only if it belongs to the user)
  @Patch(':id/cancel')
  async cancelClaim(@Param('id') id: string, @Req() req: any): Promise<Claim> {
    // const userId = req.user.id; // Extract user ID from token
    const userId = "674ff4feb35927cd75734ace"; // Extract user ID from token
    return this.claimService.cancelClaimForUser(id, userId);
  }

  // Appeal a rejected claim (only if it belongs to the user)
  @Patch(':id/appeal')
  async appealClaim(@Param('id') id: string, @Req() req: any): Promise<Claim> {
    const userId = req.user.id; // Extract user ID from token
    return this.claimService.appealClaimForUser(id, userId);
  }
}
