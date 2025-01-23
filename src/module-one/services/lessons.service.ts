import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { Lesson } from '../shemas/lesson.shema';

/**
 * LessonsService handles business logic related to lessons.
 * It provides methods for creating, retrieving, updating, and deleting lessons.
 * This service interacts with the MongoDB database using Mongoose.
 */
@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
  ) {}

  /**
   * Creates a new lesson.
   * @param createLessonDto Data Transfer Object containing the lesson details.
   * @returns The newly created lesson.
   */
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const newLesson = new this.lessonModel(createLessonDto);
    return newLesson.save();
  }

  /**
   * Retrieves all lessons.
   * @returns A list of all lessons.
   */
  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  /**
   * Retrieves a specific lesson by its ID.
   * @param id The ID of the lesson to retrieve.
   * @returns The lesson with the specified ID.
   * @throws NotFoundException if the lesson is not found.
   */
  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }
    return lesson;
  }

  /**
   * Updates a specific lesson by its ID.
   * @param id The ID of the lesson to update.
   * @param updateLessonDto Data Transfer Object containing the updated lesson details.
   * @returns The updated lesson.
   * @throws NotFoundException if the lesson is not found.
   */
  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const updatedLesson = await this.lessonModel
      .findByIdAndUpdate(id, updateLessonDto, { new: true })
      .exec();
    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }
    return updatedLesson;
  }

  /**
   * Deletes a specific lesson by its ID.
   * @param id The ID of the lesson to delete.
   * @throws NotFoundException if the lesson is not found.
   */
  async remove(id: string): Promise<void> {
    const result = await this.lessonModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }
  }

  /**
   * Finds a lesson based on a specific field and value.
   * @param field The field to search by (e.g., 'title', 'description').
   * @param value The value to match in the specified field.
   * @returns The lesson matching the criteria, or null if no match is found.
   */
  async findLessonBy(field: string, value: any) {
    const filter = { [field]: value }; // Use a dynamic key for the filter
    const lesson = await this.lessonModel.findOne(filter).exec();
    return lesson || null;
  }
}
