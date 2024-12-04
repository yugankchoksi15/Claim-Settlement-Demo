// create-repair-center.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepairCenterDto {
  @ApiProperty({
    description: 'The name of the repair center',
    example: 'AutoFix Repair Center',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The address of the repair center',
    example: '123 Main St, Springfield',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The city where the repair center is located',
    example: 'Springfield',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The contact number of the repair center',
    example: '+1 234 567 8900',
  })
  @IsString()
  @IsNotEmpty()
  contactNumber: string;
}

