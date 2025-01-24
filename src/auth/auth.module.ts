import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services/user.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/shemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';

/**
 * AuthModule is a NestJS module that encapsulates authentication-related functionality.
 * It imports necessary modules, registers controllers and providers, and exports services for use in other modules.
 */
@Module({
  // Controllers that belong to this module
  controllers: [AuthController],

  // Providers (services, repositories, etc.) that belong to this module
  providers: [AuthService, UsersService, JwtService],

  // Modules and dependencies that this module requires
  imports: [
    EmailModule,
    UsersModule, // Import the UsersModule to access user-related functionality
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema with Mongoose
  ],

  // Services that this module exports for use in other modules
  exports: [AuthService],
})
export class AuthModule {}
