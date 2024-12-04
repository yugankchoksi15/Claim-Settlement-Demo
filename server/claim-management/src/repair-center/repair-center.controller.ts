// repair-center.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { RepairCenterService } from './repair-center.service';
import { CreateRepairCenterDto } from './repair-center-dto';
import { RepairCenter } from './repair-center-schema';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Repair Center')
@ApiBearerAuth()
@Controller('repair-centers')
@UseGuards(JwtAuthGuard) 
export class RepairCenterController {
  constructor(private readonly repairCenterService: RepairCenterService) {}

  // Create a new repair center
  @Post()
  @ApiBody({ type: CreateRepairCenterDto }) 
  async createRepairCenter(
    @Body() createRepairCenterDto: CreateRepairCenterDto
  ): Promise<RepairCenter> {
    return this.repairCenterService.createRepairCenter(createRepairCenterDto);
  }

  // Get a repair center by ID
  @Get(':id')
  async getRepairCenterById(@Param('id') id: string): Promise<RepairCenter> {
    return this.repairCenterService.getRepairCenterById(id);
  }

  @Get()
  async getAllRepairCenters(): Promise<RepairCenter[]> {
    return this.repairCenterService.getAllRepairCenters();
  }
}
