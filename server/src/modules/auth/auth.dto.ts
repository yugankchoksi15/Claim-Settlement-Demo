import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    lastName: string;
  
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email: string;
  
    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'password123', description: 'The password for the account' })
    password: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password123', description: 'The password for the account' })
  password: string;
}
