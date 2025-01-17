import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateQuizDto, UpdateQuizDto } from '../dto/create-quiz.dto';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../shemas/quiz.shema';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<void> {
    return this.quizService.delete(id);
  }
}
