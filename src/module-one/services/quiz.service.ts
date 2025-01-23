import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto, UpdateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../shemas/quiz.shema';

/**
 * QuizService handles business logic related to quizzes.
 * It provides methods for creating, retrieving, updating, and deleting quizzes.
 * This service interacts with the MongoDB database using Mongoose.
 */
@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  /**
   * Creates a new quiz.
   * @param createQuizDto Data Transfer Object containing the quiz details.
   * @returns The newly created quiz.
   */
  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const createdQuiz = new this.quizModel(createQuizDto);
    return createdQuiz.save();
  }

  /**
   * Retrieves all quizzes.
   * @returns A list of all quizzes.
   */
  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  /**
   * Retrieves a specific quiz by its ID.
   * @param id The ID of the quiz to retrieve.
   * @returns The quiz with the specified ID.
   * @throws NotFoundException if the quiz is not found.
   */
  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  /**
   * Updates a specific quiz by its ID.
   * @param id The ID of the quiz to update.
   * @param updateQuizDto Data Transfer Object containing the updated quiz details.
   * @returns The updated quiz.
   * @throws NotFoundException if the quiz is not found.
   */
  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const updatedQuiz = await this.quizModel
      .findByIdAndUpdate(id, updateQuizDto, { new: true })
      .exec();
    if (!updatedQuiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return updatedQuiz;
  }

  /**
   * Deletes a specific quiz by its ID.
   * @param id The ID of the quiz to delete.
   * @throws NotFoundException if the quiz is not found.
   */
  async delete(id: string): Promise<void> {
    const result = await this.quizModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
  }
}
