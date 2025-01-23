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

/**
 * QuizController handles HTTP requests related to quizzes.
 * It provides endpoints for creating, retrieving, updating, and deleting quizzes.
 * All routes are protected by JWT authentication.
 */
@Controller('quizzes')
export class QuizController {
  /**
   * Constructor to inject the QuizService dependency.
   * @param quizService Instance of QuizService used to perform quiz-related operations.
   */
  constructor(private readonly quizService: QuizService) {}

  /**
   * Creates a new quiz.
   * @param createQuizDto Data Transfer Object containing the quiz details.
   * @returns The newly created quiz.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  /**
   * Retrieves all quizzes.
   * @returns A list of all quizzes.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  /**
   * Retrieves a specific quiz by its ID.
   * @param id The ID of the quiz to retrieve.
   * @returns The quiz with the specified ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  /**
   * Updates a specific quiz by its ID.
   * @param id The ID of the quiz to update.
   * @param updateQuizDto Data Transfer Object containing the updated quiz details.
   * @returns The updated quiz.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.update(id, updateQuizDto);
  }

  /**
   * Deletes a specific quiz by its ID.
   * @param id The ID of the quiz to delete.
   * @returns A confirmation that the quiz has been deleted.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<void> {
    return this.quizService.delete(id);
  }
}
