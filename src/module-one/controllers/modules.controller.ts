import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ModulesService } from '../services/modules.service';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { Module } from '../shemas/module.shema';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

/**
 * ModulesController handles HTTP requests related to modules.
 * It provides endpoints for creating, retrieving, updating, and deleting modules.
 * All routes are protected by JWT authentication.
 */
@Controller('modules')
export class ModulesController {
  /**
   * Constructor to inject the ModulesService dependency.
   * @param modulesService Instance of ModulesService used to perform module-related operations.
   */
  constructor(private readonly modulesService: ModulesService) {}

  /**
   * Creates a new module.
   * @param createModuleDto Data Transfer Object containing the module details.
   * @returns The newly created module.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createModuleDto: CreateModuleDto): Promise<Module> {
    return this.modulesService.create(createModuleDto);
  }

  /**
   * Retrieves all modules.
   * @returns A list of all modules.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Module[]> {
    return this.modulesService.findAll();
  }

  /**
   * Retrieves a specific module by its ID.
   * @param id The ID of the module to retrieve.
   * @returns The module with the specified ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Module> {
    return this.modulesService.findOne(id);
  }

  /**
   * Updates a specific module by its ID.
   * @param id The ID of the module to update.
   * @param updateModuleDto Data Transfer Object containing the updated module details.
   * @returns The updated module.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<Module> {
    return this.modulesService.update(id, updateModuleDto);
  }

  /**
   * Deletes a specific module by its ID.
   * @param id The ID of the module to delete.
   * @returns The deleted module.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<Module> {
    return this.modulesService.remove(id);
  }
}
