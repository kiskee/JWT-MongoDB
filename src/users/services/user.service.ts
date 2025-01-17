import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  /**
   * Constructor to inject the user model dependency.
   * @param userModel - Mongoose model for the User schema.
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Creates a new user in the database.
   * @param createUserDto - Data Transfer Object containing the user details.
   * @returns The newly created user document.
   * @throws BadRequestException if the validation fails or the email is already in use.
   */
  async createUser(createUserDto: any): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      if (newUser.password != '' && !newUser.email_verified) {
        newUser.password = await bcrypt.hash(newUser.password, this.saltRounds);
      }
      newUser.role = "user"
      newUser.createdAt = new Date();
      newUser.updatedAt = new Date();
      const newUserCreated = await newUser.save();
      delete newUserCreated.password;
      return newUserCreated;
    } catch (error) {
      // Specific Mongoose validation errors.
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message); // Includes the schema validation message.
      }
      if (error.code === 11000) {
        throw new BadRequestException('This email is already in use');
      }
      throw error;
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns An array of all user documents.
   */
  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password -email -_id').exec();
  }

  /**
   * Finds a user by their ID.
   * @param id - The unique identifier of the user.
   * @returns The user document if found.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`The user with ID ${id} was not found`);
    }
    return user;
  }

  /**
   * Deletes a user by their ID.
   * @param id - The unique identifier of the user.
   * @returns The deleted user document.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`The user with ID ${id} was not found`);
    }
    return user;
  }

  /**
   * Updates the user's details (password, email, and username).
   * @param id - The unique identifier of the user to update.
   * @param updateUserDto - An object containing the fields to update.
   * @returns The updated user document.
   * @throws NotFoundException if the user with the given ID is not found.
   * @throws BadRequestException if validation fails or the email is already in use.
   */
  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    try {
      updateUserDto.updatedAt = new Date();
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { $set: updateUserDto },
          { new: true, runValidators: true },
        )
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`The user with ID ${id} was not found`);
      }

      return updatedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      if (error.code === 11000) {
        throw new BadRequestException('This email is already in use');
      }
      throw error;
    }
  }

  /**
   * Find a user by their email address.
   * @param email - The email address to search for.
   * @returns A promise that resolves with the found user or throws an exception if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user || null;
  }
}
