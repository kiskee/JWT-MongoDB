import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { LessonsService } from "../services/lessons.service";
import { CreateLessonDto } from "../dto/create-lesson.dto";
import { UpdateLessonDto } from "../dto/update-lesson.dto";

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // Crear una nueva lección
  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  // Obtener todas las lecciones
  @Get()
  async findAll() {
    return this.lessonsService.findAll();
  }

  // Obtener una lección por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  // Actualizar una lección por su ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  // Eliminar una lección por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}