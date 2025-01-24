import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './shemas/user.schema';
import { UsersService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserProgress, UserProgressSchema } from './shemas/userProgress.shema';
import { UserProgressController } from './controllers/userProgress.controller';
import { UserProgressService } from './services/userProgress.service';
import { EmailModule } from 'src/email/email.module';

/**
 * UsersModule is a NestJS module that encapsulates functionality related to users and user progress.
 * It registers controllers, services, and database schemas, and integrates with the JWT authentication system.
 */
@Module({
  // Controllers that belong to this module
  controllers: [UsersController, UserProgressController],

  // Providers (services) that belong to this module
  providers: [UsersService, UserProgressService],

  // Modules and dependencies that this module requires
  imports: [
    EmailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use environment variable for JWT secret
      signOptions: { expiresIn: '15m' }, // Set token expiration time
    }),
    MongooseModule.forFeature([
      // Register Mongoose schemas for users and user progress
      { name: User.name, schema: UserSchema, collection: 'users' },
      {
        name: UserProgress.name,
        schema: UserProgressSchema,
        collection: 'userProgress',
      },
    ]),
  ],

  // Services that this module exports for use in other modules
  exports: [UsersService, UserProgressService],
})
export class UsersModule {}
