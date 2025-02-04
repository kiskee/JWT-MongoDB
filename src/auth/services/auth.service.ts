import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/user.service';
import { GoogleDto } from '../dto/google.dto';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { EmailService } from 'src/email/services/email.service';
import { SendEmailDto } from 'src/email/dto/send-email.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private blacklistedTokens: Set<string> = new Set();

  /**
   * Constructor for AuthService
   * @param usersService - Service to manage user-related operations
   * @param jwtService - Service for handling JWT tokens
   */
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Handles user login
   * @param loginDto - Data transfer object containing user credentials
   * @returns Object with user details and tokens
   */
  async login(loginDto: LoginDto) {
    try {
      // Simulate user search (replace with your database logic)
      const user = await this.usersService.findByEmail(loginDto.email as any);

      if (Object.keys(user).length === 0 && user.constructor === Object) {
        throw new UnauthorizedException('Usuario o Contraseña invalidos');
      }

      // Validate password
      const isPasswordValid = await this.comparePasswords(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Usuario o Contraseña invalidos');
      }

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          picture: user.picture,
          name: user.name,
          modules: user.modules,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Handles user logout
   * @param token - The token to be blacklisted
   * @returns A message confirming successful logout
   */
  logout(token: string) {
    // Add the token to the blacklist to invalidate it
    this.blacklistedTokens.add(token);
    return { message: 'Logout successful' };
  }

  /**
   * Renews the access token using a refresh token
   * @param refreshToken - The refresh token to validate and use
   * @returns A new access token
   */
  async renewToken(refreshToken: string) {
    try {
      // Check if the refresh token is blacklisted
      if (this.blacklistedTokens.has(refreshToken)) {
        throw new UnauthorizedException('Invalid token');
      }

      // Verify and decode the refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.jwtSecret,
      });

      // Find the user (replace with your database logic)
      const user = await this.usersService.findByEmail(decoded.email);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate a new access token
      const newAccessToken = this.generateAccessToken(user);

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Could not renew token');
    }
  }

  /**
   * Generates an access token for the given user
   * @param user - The user for whom the token is generated
   * @returns A signed JWT access token
   */
  private generateAccessToken(user: any): string {
    return this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtSecret,
        expiresIn: '60m', // Short-lived access token
      },
    );
  }

  /**
   * Generates a refresh token for the given user
   * @param user - The user for whom the token is generated
   * @returns A signed JWT refresh token
   */
  private generateRefreshToken(user: any): string {
    return this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtSecret,
        expiresIn: '7d', // Long-lived refresh token
      },
    );
  }

  /**
   * Compares a plain text password with a hashed password
   * @param plainPassword - The plain text password
   * @param hashedPassword - The hashed password
   * @returns A boolean indicating if the passwords match
   */
  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async loginGoogle(loginDto: GoogleDto) {
    try {
      // 1. Validar que el email esté verificado por Google
      if (!loginDto.email_verified) {
        throw new UnauthorizedException('Error al intentar entrar con Google');
      }
      // Simulate user search (replace with your database logic)
      let user = await this.usersService.findByEmail(loginDto.email);

      // 3. Si no existe, crear un nuevo usuario
      if (Object.keys(user).length < 1) {
        user = await this.usersService.createUser(loginDto);
      }

      if (user.sub !== loginDto.sub) {
        throw new UnauthorizedException('Error al intentar entrar con Google');
      }
      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          picture: user.picture,
          name: user.name,
          modules: user.modules,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generates a signature for a transaction based on the provided parameters.
   * The signature is created using a concatenated string of transaction details and a secret key, which is then hashed using SHA-256.
   *
   * @param value The monetary value of the transaction.
   * @param currency The currency code for the transaction (e.g., 'USD', 'EUR').
   * @param user The authenticated user object containing user-specific information (e.g., user ID).
   * @returns An object containing the transaction details, including the generated signature, reference, and expiration time.
   */
  async generateSignature(value: number, currency: string, user: any) {
    // Generate a unique reference for the transaction using a UUID and the user's ID
    const reference = uuidv4() + '/' + user.sub;

    // Generate an expiration date for the transaction (10 minutes from the current time)
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + 10 * 60 * 1000);
    const formattedDate = expirationDate.toISOString();

    // Concatenate the transaction details and the secret key into a single string
    const concatenatedString = `${reference}${value}${currency}${formattedDate}${process.env.INT_KI}`;

    // Generate a SHA-256 hash of the concatenated string
    const encoder = new TextEncoder();
    const data = encoder.encode(concatenatedString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Return the transaction details, including the generated signature
    return {
      currency: currency, // The currency of the transaction
      amountInCents: value, // The transaction value in cents
      reference: reference, // The unique reference for the transaction
      signatureIntegrity: hashHex, // The generated SHA-256 hash (signature)
      expirationTime: formattedDate, // The expiration time of the transaction
    };
  }

  async sendPasswordResetEmail(email: string) {
    console.log('entre al metodo', email);
    const user = await this.usersService.findByEmail(email as any);
    if (!user) return;

    const token = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '15m', secret: this.jwtSecret },
    );

    const emailData: SendEmailDto = {
      recipients: user.email, // Puede ser un array: ['usuario1@example.com', 'usuario2@example.com']
      subject: 'Cambia tu contraseña en Svgswim',
      template: 'reset-password', // Nombre del template
      context: {
        resetLink: `https://www.svgswim.top/change-pass?token=${token}`, //http://localhost:5173 //https://www.svgswim.top/change-pass
      },
    };
    await this.emailService.sendEmail(emailData);
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      console.log('entre');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
      console.log(payload);
      const user = await this.usersService.findOne(payload.sub);
      if (!user) throw new Error('User not found');

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
