import { IsNotEmpty, IsOptional, IsArray, IsString, IsNumber } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  totalLessons: number;

  @IsOptional()
  @IsString()
  finalExamId: string;

  @IsOptional()
  @IsArray()
  lessons: string[]; // IDs de las lecciones
}
