import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { LessonsService } from "../services/lessons.service";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { UpdateLessonDto } from "../dto/update-lesson.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // Crear una nueva lección
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  // Obtener todas las lecciones
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.lessonsService.findAll();
  }

  // Obtener una lección por su ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  // Actualizar una lección por su ID
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  // Eliminar una lección por su ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}