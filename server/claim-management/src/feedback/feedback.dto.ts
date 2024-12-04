import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  userId: string; // Reference to the User

  @IsString()
  @IsNotEmpty()
  claimId: string; // Reference to the Claim

  @IsNumber()
  @Min(0)
  @Max(10)
  score: number; // NPS Score (0-10)

  @IsString()
  @IsNotEmpty()
  comments: string; // Optional feedback text
}
