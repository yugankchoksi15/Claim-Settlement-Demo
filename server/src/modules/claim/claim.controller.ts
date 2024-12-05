import { Controller, Get, Post, Put, Body, Param, Patch, Req, UseGuards, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { Claim } from './claim.schema';
import { ClaimService } from './claim.service';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../../guards/auth.guard'; // Adjust the path as needed
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClaimAppealDto, ClaimApprovalDto, CreateClaimDto } from './claim.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationResult } from 'src/utils/paginator.util';

@Controller('claim')
@ApiTags('Claim')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClaimController {
  constructor(private readonly claimService: ClaimService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directory for uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Extract file extension
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a claim with an optional file upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Optional file to upload',
        },
        model: { type: 'string', description: 'Vehicle model', example: 'Honda City 2022' },
        company: { type: 'string', description: 'Vehicle company', example: 'Honda' },
        yearOfManufacturing: { type: 'number', description: 'Year of manufacturing', example: 2018 },
        vehicleNumber: { type: 'string', description: 'Vehicle registration number', example: 'MH12AB1234' },
        issueDescription: { type: 'string', description: 'Description of the issue', example: 'Front bumper damage due to an accident.' },
        repairCenter: { type: 'string', description: 'Repair center ID', example: '67500df7b1ae8bd5daa7eeb1' },
      },
      required: ['model', 'company', 'yearOfManufacturing', 'vehicleNumber', 'issueDescription'],
    },
  })
  async createClaim(
    @Body() claim: CreateClaimDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<Claim> {
    const claimData = {
      ...claim,
      documents: file ? [`/uploads/${file.filename}`] : [], // Add the file path to the documents array
    };
    return this.claimService.createClaim(claimData, req.user.id);
  }

  @Get('/approval')
  @UseGuards(AdminGuard)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getClaimsToBeApproved(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResult<Claim>> {
    return this.claimService.getClaimsForApprovalWithPagination(page, limit);
  }

  // Update a claim (e.g., status or details, only if it belongs to the user)
  @Put('/appeal/:id')
  @ApiBody({ type: ClaimAppealDto })
  async AppealClaim(@Param('id') id: string, @Body() update: ClaimAppealDto, @Req() req: any): Promise<Claim> {
    return this.claimService.updateClaimForUser(id, req.user.id, update);
  }

  @Put('/approval/:id')
  @UseGuards(AdminGuard)
  @ApiBody({ type: ClaimApprovalDto })
  async updateClaim(@Param('id') id: string, @Body() update: ClaimApprovalDto, @Req() req: any): Promise<Claim> {
    return this.claimService.updateClaimForAdmin(id, req.user.id, update);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getClaimsForUser(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: any,
  ): Promise<PaginationResult<Claim>> {
    return this.claimService.getClaimsByUserWithPagination(req.user.id, page, limit);
  }

  // Get a specific claim by its ID (only if it belongs to the user)
  @Get(':id')
  async getClaimById(@Param('id') id: string, @Req() req: any): Promise<Claim> {
    const userId = req.user.id; // Extract user ID from token
    return this.claimService.getClaimByIdForUser(id, userId);
  }
}
