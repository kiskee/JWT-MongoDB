import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from '../services/lessons.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

/**
 * LessonsController handles HTTP requests related to lessons.
 * It provides endpoints for creating, retrieving, updating, and deleting lessons.
 * All routes are protected by JWT authentication.
 */
@Controller('lessons')
export class LessonsController {
  /**
   * Constructor to inject the LessonsService dependency.
   * @param lessonsService Instance of LessonsService used to perform lesson-related operations.
   */
  constructor(private readonly lessonsService: LessonsService) {}

  /**
   * Creates a new lesson.
   * @param createLessonDto Data Transfer Object containing the lesson details.
   * @returns The newly created lesson.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  /**
   * Retrieves all lessons.
   * @returns A list of all lessons.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.lessonsService.findAll();
  }

  /**
   * Retrieves a specific lesson by its ID.
   * @param id The ID of the lesson to retrieve.
   * @returns The lesson with the specified ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  /**
   * Updates a specific lesson by its ID.
   * @param id The ID of the lesson to update.
   * @param updateLessonDto Data Transfer Object containing the updated lesson details.
   * @returns The updated lesson.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  /**
   * Deletes a specific lesson by its ID.
   * @param id The ID of the lesson to delete.
   * @returns A confirmation message or the deleted lesson.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }

  /**
   * Finds lessons based on a specific field and value.
   * @param data An object containing the field and value to search for.
   * @returns A list of lessons matching the specified criteria.
   */
  @Post('/find/value')
  @UseGuards(JwtAuthGuard)
  async findBy(@Body() data: any) {
    return await this.lessonsService.findLessonBy(data.field, data.value);
  }
}
