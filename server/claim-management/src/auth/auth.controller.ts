import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const {firstName, lastName, email, password} = registerDto
    return this.authService.register(firstName, lastName, email, password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const {email, password} = loginDto
    return this.authService.login(email, password);
  }
}
