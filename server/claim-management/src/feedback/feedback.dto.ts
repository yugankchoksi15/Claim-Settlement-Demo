import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {

  @ApiProperty({
    description: 'The ID of the claim for which feedback is being provided',
    example: '64d3fba2483f12cd24af78de',
  })
  @IsString()
  @IsNotEmpty()
  claimId: string; // Reference to the Claim

  @ApiProperty({
    description: 'Net Promoter Score (NPS) ranging from 0 to 10',
    example: 8,
    minimum: 0,
    maximum: 10,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  score: number; // NPS Score (0-10)

  @ApiProperty({
    description: 'Optional feedback comments from the user',
    example: 'The repair process was smooth and timely.',
  })
  @IsString()
  @IsNotEmpty()
  comments: string; // Optional feedback text
}
