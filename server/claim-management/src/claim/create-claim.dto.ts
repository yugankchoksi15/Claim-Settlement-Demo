// src/claims/dto/create-claim.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  userId: string; // User who is submitting the claim

  @IsString()
  @IsNotEmpty()
  vehicleInfo: string; // Vehicle information (e.g., vehicle model, registration number)
}
