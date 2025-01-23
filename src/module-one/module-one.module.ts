import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './shemas/lesson.shema';
import { ModuleSchema, Module as ModuleX } from './shemas/module.shema';
import { Quiz, QuizSchema } from './shemas/quiz.shema';
import { LessonsController } from './controllers/lessons.controller';
import { LessonsService } from './services/lessons.service';
import { ModulesController } from './controllers/modules.controller';
import { ModulesService } from './services/modules.service';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { Transactions, TransactionsShema } from './shemas/trasactions.shema';
import { TransactionsController } from './controllers/trasactions.controller';
import { TransactionsService } from './services/trasactions.service';
import { UsersModule } from 'src/users/users.module';

/**
 * ModuleOne is a NestJS module that encapsulates functionality related to lessons, modules, quizzes, and transactions.
 * It registers controllers, services, and database schemas, and integrates with the JWT authentication system.
 */
@Module({
  // Controllers that belong to this module
  controllers: [
    LessonsController,
    ModulesController,
    QuizController,
    TransactionsController,
  ],

  // Providers (services) that belong to this module
  providers: [ModulesService, LessonsService, QuizService, TransactionsService],

  // Modules and dependencies that this module requires
  imports: [
    UsersModule, // Import the UsersModule to access user-related functionality
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use environment variable for JWT secret
      signOptions: { expiresIn: '15m' }, // Set token expiration time
    }),
    MongooseModule.forFeature([
      // Register Mongoose schemas for lessons, modules, quizzes, and transactions
      { name: Lesson.name, schema: LessonSchema, collection: 'lessons' },
      { name: ModuleX.name, schema: ModuleSchema, collection: 'modules' },
      { name: Quiz.name, schema: QuizSchema, collection: 'quizes' },
      {
        name: Transactions.name,
        schema: TransactionsShema,
        collection: 'transactions',
      },
    ]),
  ],

  // Services that this module exports for use in other modules
  exports: [ModulesService, LessonsService, QuizService, TransactionsService],
})
export class ModuleOne {}
