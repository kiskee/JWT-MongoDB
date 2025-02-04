import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  Headers,
  Get,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { GoogleDto } from '../dto/google.dto';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  /**
   * Constructor to inject the AuthService dependency.
   * @param authService Instance of AuthService used for authentication operations.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login requests.
   * @param loginDto Data Transfer Object containing user credentials (email and password).
   * @returns An object containing access and refresh tokens, and user information.
   */
  @Post('login')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Handles user login requests using Google authentication.
   * @param loginDto Data Transfer Object containing Google authentication details.
   * @returns An object containing access and refresh tokens, and user information.
   */
  @Post('login-google')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async loginGoogle(@Body() loginDto: GoogleDto) {
    try {
      return  await this.authService.loginGoogle(loginDto);
    } catch (error) {
      throw error
    }
  }

  /**
   * Handles user logout requests.
   * @param token The authorization token from the request headers.
   * @returns A confirmation message upon successful logout.
   * @throws UnauthorizedException if the token is not provided.
   */
  @Post('logout')
  logout(@Headers('authorization') token: string) {
    // Remove 'Bearer ' from the token
    const tokenWithoutBearer = token?.replace('Bearer ', '');

    if (!tokenWithoutBearer) {
      throw new UnauthorizedException('Token not provided');
    }

    return this.authService.logout(tokenWithoutBearer);
  }

  /**
   * Handles requests to renew an access token using a refresh token.
   * @param refreshToken The refresh token provided in the request body.
   * @returns A new access token.
   * @throws UnauthorizedException if the refresh token is not provided.
   */
  @Post('renew-token')
  renewToken(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    return this.authService.renewToken(refreshToken);
  }

  /**
   * Handles requests to generate a signature for a transaction.
   * @param value The value of the transaction.
   * @param currency The currency of the transaction.
   * @param user The authenticated user extracted from the JWT token.
   * @returns A generated signature for the transaction.
   */
  @Get('signature')
  @UseGuards(JwtAuthGuard)
  async getSignature(
    @Query('value') value: number,
    @Query('currency') currency: string,
    @GetUser() user: any,
  ) {
    return await this.authService.generateSignature(value, currency, user);
  }

  @Post('forgot-password/:email')
  async forgotPassword(@Param('email') email: string) {
    await this.authService.sendPasswordResetEmail(email);
    return { message: 'Se envio un link para reestablecer la contraseña al correo proporcionado' };
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data.token, data.newPassword);
  }
}
