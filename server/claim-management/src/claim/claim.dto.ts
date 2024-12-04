import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClaimStatus } from './claim.schema';

export class CreateClaimDto {
  @ApiProperty({
    description: 'Model of the vehicle',
    example: 'Honda CITY 2022',
  })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Company of the vehicle',
    example: 'Honda',
  })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Year the vehicle was manufactured',
    example: 2018,
  })
  @IsNotEmpty()
  @IsNumber()
  yearOfManufacturing: number;

  @ApiProperty({
    description: 'Vehicle registration number',
    example: 'MH12AB1234',
  })
  @IsNotEmpty()
  @IsString()
  vehicleNumber: string;

  @ApiProperty({
    description: 'Description of the issue',
    example: 'Front bumper damage due to an accident.',
  })
  @IsNotEmpty()
  @IsString()
  issueDescription: string;

  @ApiProperty({
    description: 'Id of the repair center',
    example: '7mip6526y446l4m@m42',
  })
  @IsNotEmpty()
  @IsString()
  repairCenter: string;
}

export class UpdateClaimDto {

  @IsEnum(ClaimStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The status you want to change to',
    example: 'Appealed',
    enum: ClaimStatus,
    enumName: 'ClaimStatus',
  })
  status: ClaimStatus;
}

