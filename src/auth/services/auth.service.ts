import { Inject, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/user.service';
import { GoogleDto } from '../dto/google.dto';

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
  ) {}

  /**
   * Handles user login
   * @param loginDto - Data transfer object containing user credentials
   * @returns Object with user details and tokens
   */
  async login(loginDto: LoginDto) {
    try {
      // Simulate user search (replace with your database logic)
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // // Validate password
      // const isPasswordValid = await this.comparePasswords(
      //   loginDto.password,
      //   user.password,
      // );

      // if (!isPasswordValid) {
      //   throw new UnauthorizedException('Invalid credentials');
      // }

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Error during login');
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
      // Simulate user search (replace with your database logic)
      let user = await this.usersService.findByEmail(loginDto.email);

      if (!user) {
        if ( (loginDto.password || loginDto.password != "") &&  loginDto.email_verified == true){
          loginDto.password = "";
        }
        user = await this.usersService.createUser(loginDto);
      }

      // Validate password
      if (user.password != ""){
        const isPasswordValid = await this.comparePasswords(
          loginDto.password,
          user.password,
        );
  
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
      }

      const payload = {
        sub: user.id,
        email: user.email,
        googleId: user.sub,
      };
      // Generate tokens
      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);

      return {
        user: {
          id: user.id,
          email: user.email,
          // other fields you want to return
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Error during login' + error);
    }
  }
}
