import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserProgressDto } from '../dto/create-userProgress.dto';
import { UpdateUserProgressDto } from '../dto/update-userProgress.dto';
import { UserProgress } from '../shemas/userProgress.shema';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectModel(UserProgress.name)
    private readonly userProgressModel: Model<UserProgress>,
  ) {}

  async create(
    createUserProgressDto: CreateUserProgressDto,
  ): Promise<UserProgress> {
    const userProgress = new this.userProgressModel(createUserProgressDto);
    return userProgress.save();
  }

  async findAll(): Promise<UserProgress[]> {
    return this.userProgressModel.find().exec();
  }

  async findOne(id: string): Promise<UserProgress> {
    const userProgress = await this.userProgressModel.findById(id).exec();
    return userProgress || ({} as UserProgress);
  }

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

  async remove(id: string): Promise<void> {
    const result = await this.userProgressModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`UserProgress with ID ${id} not found`);
    }
  }

  async findBy(field: string, value: any) {
    const filter = { [field]: value }; // Usamos una clave dinámica
    const userProgress = await this.userProgressModel.findOne(filter).exec();
    return userProgress || null;
  }
}
