import { Injectable, Module, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module as Modulex } from '../shemas/module.shema'
import { Model } from 'mongoose';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Modulex>,
  ) {}

  // Crear un módulo
  async create(createModuleDto: CreateModuleDto): Promise<Modulex> {
    const newModule = new this.moduleModel(createModuleDto);
    return newModule.save();
  }

  // Obtener todos los módulos
  async findAll(): Promise<Modulex[]> {
    return this.moduleModel.find().populate('lessons').exec();
  }

  // Obtener un módulo por su ID
  async findOne(id: string): Promise<Modulex> {
    const module = await this.moduleModel.findById(id).populate('lessons').exec();
    if (!module) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return module;
  }

  // Actualizar un módulo
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

  // Eliminar un módulo
  async remove(id: string): Promise<Modulex> {
    const deletedModule = await this.moduleModel.findByIdAndDelete(id).exec();
    if (!deletedModule) {
      throw new NotFoundException(`Module with ID "${id}" not found`);
    }
    return deletedModule;
  }
}
