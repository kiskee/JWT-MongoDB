import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Lesson extends Document {
  @Prop({ required: true })
  moduleId: string; // Referencia al módulo

  @Prop({ required: true })
  title: string;

  @Prop({ type: Object })
  content: {
    text: string;
    media: { type: string; url: string }[];
  };

  @Prop()
  quizId: string; // Referencia al quiz (opcional)

  @Prop({ required: true })
  order: number; // Orden de la lección en el módulo

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);