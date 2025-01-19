import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { Lesson } from '../shemas/lesson.shema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
  ) {}

  // Crear una nueva lección
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const newLesson = new this.lessonModel(createLessonDto);
    return newLesson.save();
  }

  // Obtener todas las lecciones
  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  // Obtener una lección por su ID
  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }
    return lesson;
  }

  // Actualizar una lección por su ID
  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const updatedLesson = await this.lessonModel
      .findByIdAndUpdate(id, updateLessonDto, { new: true })
      .exec();
    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }
    return updatedLesson;
  }

  // Eliminar una lección por su ID
  async remove(id: string): Promise<void> {
    const result = await this.lessonModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }
  }

  /**
   *
   * @param field
   * @param value
   */
  async findLessonBy(field: string, value: any) {
    const filter = { [field]: value }; // Usamos una clave dinámica
    const lesson = await this.lessonModel.findOne(filter).exec();
    return lesson || null;
  }
}
