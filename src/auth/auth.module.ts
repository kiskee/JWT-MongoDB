import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services/user.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/shemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtService],
  imports: [UsersModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  exports: [AuthService],
})
export class AuthModule {}
