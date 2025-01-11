import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  /**
   * Constructor for JwtAuthGuard
   * @param jwtService - Service for handling JWT token operations
   */
  constructor(private jwtService: JwtService) {}

  /**
   * Determines if a request can proceed based on JWT token validation
   * @param context - Execution context of the request
   * @returns A boolean indicating if the request is authorized
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      // Attach the user's payload to the request object
      request['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Extracts the token from the Authorization header of the request
   * @param request - Incoming HTTP request
   * @returns The token if present and valid, otherwise undefined
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
