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

@Module({
  controllers: [LessonsController, ModulesController, QuizController],
  providers: [ModulesService, LessonsService, QuizService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Usar variables de entorno
      signOptions: { expiresIn: '15m' },
    }),
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema, collection: 'lessons' },
      { name: ModuleX.name, schema: ModuleSchema, collection: 'modules' },
      { name: Quiz.name, schema: QuizSchema, collection: 'quizes' },
    ]),
  ],
  exports: [ModulesService, LessonsService, QuizService],
})
export class ModuleOne {}