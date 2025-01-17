import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // timestamps agrega automáticamente `createdAt` y `updatedAt`
export class UserProgress extends Document {
  @Prop({ required: true })
  userId: string; // ID del usuario al que pertenece este progreso

  @Prop({ required: true })
  courseId: string; // ID del curso al que pertenece este progreso

  @Prop({ default: 1 })
  currentModule: number; // Módulo actual en el que se encuentra el usuario

  @Prop({ default: 1 })
  currentLesson: number; // Lección actual dentro del módulo

  @Prop({ type: [Number], default: [] })
  completedLessons: number[]; // Array con los IDs de las lecciones completadas

  @Prop({ required: true })
  totalLessons: number; // Número total de lecciones en el curso

  @Prop({ default: 0 })
  quizScore: number; // Puntuación acumulada en los quizzes del curso

  @Prop({ default: false })
  finalExamPassed: boolean; // Indica si aprobó el examen final

  @Prop({ type: Date, default: () => new Date() })
  startedAt: Date; // Fecha en la que comenzó el curso

  @Prop({ type: Date, default: null })
  completedAt: Date; // Fecha en la que completó el curso (puede ser null si no lo ha terminado)
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
