import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ModuleOne } from './module-one/module-one.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // Hace que las variables estén disponibles globalmente
    }),
    UsersModule,
    AuthModule,
    ModuleOne,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DB_PASS}${process.env.MONGO_UR}`,
      {},
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
