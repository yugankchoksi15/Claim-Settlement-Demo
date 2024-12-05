import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token not provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.decode(token);

      if (payload && payload.user_id){
        request.user = {
          id: payload.user_id,
          email: payload.email
        }
        return true;
      }else {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
