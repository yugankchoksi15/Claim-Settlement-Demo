import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/modules/auth/auth.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { SuperAdminGuard } from 'src/guards/super-admin.guard';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard,SuperAdminGuard) 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiBody({ type: RegisterDto })
  async register(@Body() userInfo: RegisterDto) {
    return this.userService.createAdminUser(userInfo);
  }
}