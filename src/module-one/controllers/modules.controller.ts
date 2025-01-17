import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ModulesService } from '../services/modules.service';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { Module } from '../shemas/module.shema';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createModuleDto: CreateModuleDto): Promise<Module> {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Module[]> {
    return this.modulesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Module> {
    return this.modulesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<Module> {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<Module> {
    return this.modulesService.remove(id);
  }
}
