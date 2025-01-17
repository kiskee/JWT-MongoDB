import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './shemas/user.schema';
import { UsersService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserProgress, UserProgressSchema } from './shemas/userProgress.shema';
import { UserProgressController } from './controllers/userProgress.controller';
import { UserProgressService } from './services/userProgress.service';

@Module({
  controllers: [UsersController, UserProgressController],
  providers: [UsersService, UserProgressService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Usar variables de entorno
      signOptions: { expiresIn: '15m' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
      { name: UserProgress.name, schema: UserProgressSchema, collection: 'userProgress' },
    ]),
  ],
  exports: [UsersService, UserProgressService],
})
export class UsersModule {}
