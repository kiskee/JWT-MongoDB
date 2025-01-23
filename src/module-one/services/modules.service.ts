import { Injectable, Module, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module as Modulex } from '../shemas/module.shema';
import { Model } from 'mongoose';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';

/**
 * ModulesService handles business logic related to modules.
 * It provides methods for creating, retrieving, updating, and deleting modules.
 * This service interacts with the MongoDB database using Mongoose and supports populating related lessons.
 */
@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modulex.name) private readonly moduleModel: Model<Modulex>,
  ) {}

  /**
   * Creates a new module.
   * @param createModuleDto Data Transfer Object containing the module details.
   * @returns The newly created module.
   */
  async create(createModuleDto: CreateModuleDto): Promise<Modulex> {
    const newModule = new this.moduleModel(createModuleDto);
    return newModule.save();
  }

  /**
   * Retrieves all modules, populating the related lessons.
   * @returns A list of all modules with their associated lessons.
   */
  async findAll(): Promise<Modulex[]> {
    return this.moduleModel.find().populate('lessons').exec();
  }

  /**
   * Retrieves a specific module by its ID, populating the related lessons.
   * @param id The ID of the module to retrieve.
   * @returns The module with the specified ID and its associated lessons.
   * @throws NotFoundException if the module is not found.
   */
  async findOne(id: string): Promise<Modulex> {
    const module = await this.moduleModel
      .findById(id)
      .populate('lessons')
      .exec();
    if (!module) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return module;
  }

  /**
   * Updates a specific module by its ID.
   * @param id The ID of the module to update.
   * @param updateModuleDto Data Transfer Object containing the updated module details.
   * @returns The updated module with its associated lessons.
   * @throws NotFoundException if the module is not found.
   */
  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Modulex> {
    const updatedModule = await this.moduleModel
      .findByIdAndUpdate(id, updateModuleDto, { new: true })
      .populate('lessons')
      .exec();
    if (!updatedModule) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return updatedModule;
  }

  /**
   * Deletes a specific module by its ID.
   * @param id The ID of the module to delete.
   * @returns The deleted module.
   * @throws NotFoundException if the module is not found.
   */
  async remove(id: string): Promise<Modulex> {
    const deletedModule = await this.moduleModel.findByIdAndDelete(id).exec();
    if (!deletedModule) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return deletedModule;
  }
}
