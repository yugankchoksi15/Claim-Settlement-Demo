import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairCenterController } from './repair-center.controller';
import { RepairCenterService } from './repair-center.service';
import { RepairCenter, RepairCenterSchema } from './repair-center-schema';
import { JwtModule } from '@nestjs/jwt';
// import { RepairCenter, RepairCenterSchema } from './repair-center.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: RepairCenter.name, schema: RepairCenterSchema }]),JwtModule],
  controllers: [RepairCenterController],
  providers: [RepairCenterService],
})
export class RepairCenterModule {}
