import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserProgressDto } from '../dto/create-userProgress.dto';
import { UpdateUserProgressDto } from '../dto/update-userProgress.dto';
import { UserProgress } from '../shemas/userProgress.shema';

/**
 * UserProgressService handles business logic related to user progress.
 * It provides methods for creating, retrieving, updating, and deleting user progress records.
 * This service interacts with the MongoDB database using Mongoose.
 */
@Injectable()
export class UserProgressService {
  constructor(
    @InjectModel(UserProgress.name)
    private readonly userProgressModel: Model<UserProgress>, // Injects the UserProgress model into the service
  ) {}

  /**
   * Creates a new user progress record.
   * @param createUserProgressDto Data Transfer Object containing the user progress details.
   * @returns The newly created user progress record.
   */
  async create(
    createUserProgressDto: CreateUserProgressDto,
  ): Promise<UserProgress> {
    const userProgress = new this.userProgressModel(createUserProgressDto);
    return userProgress.save();
  }

  /**
   * Retrieves all user progress records.
   * @returns A list of all user progress records.
   */
  async findAll(): Promise<UserProgress[]> {
    return this.userProgressModel.find().exec();
  }

  /**
   * Retrieves a specific user progress record by its ID.
   * @param id The ID of the user progress record to retrieve.
   * @returns The user progress record with the specified ID, or an empty object if not found.
   */
  async findOne(id: string): Promise<UserProgress> {
    const userProgress = await this.userProgressModel.findById(id).exec();
    return userProgress || ({} as UserProgress);
  }

  /**
   * Updates a specific user progress record by its ID.
   * @param id The ID of the user progress record to update.
   * @param updateUserProgressDto Data Transfer Object containing the updated user progress details.
   * @returns The updated user progress record.
   * @throws NotFoundException if the user progress record is not found.
   */
  async update(
    id: string,
    updateUserProgressDto: UpdateUserProgressDto,
  ): Promise<UserProgress> {
    const updatedProgress = await this.userProgressModel
      .findByIdAndUpdate(id, updateUserProgressDto, { new: true })
      .exec();
    if (!updatedProgress) {
      throw new NotFoundException(`UserProgress with ID ${id} not found`);
    }
    return updatedProgress;
  }

  /**
   * Deletes a specific user progress record by its ID.
   * @param id The ID of the user progress record to delete.
   * @throws NotFoundException if the user progress record is not found.
   */
  async remove(id: string): Promise<void> {
    const result = await this.userProgressModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`UserProgress with ID ${id} not found`);
    }
  }

  /**
   * Finds a user progress record based on a specific field and value.
   * @param field The field to search by (e.g., 'userId', 'courseId').
   * @param value The value to match in the specified field.
   * @returns The user progress record matching the criteria, or null if no match is found.
   */
  async findBy(field: string, value: any) {
    const filter = { [field]: value }; // Use a dynamic key for the filter
    const userProgress = await this.userProgressModel.findOne(filter).exec();
    return userProgress || null;
  }
}
