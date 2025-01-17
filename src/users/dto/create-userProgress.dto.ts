import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateUserProgressDto {
  @IsString()
  userId: string;

  @IsString()
  courseId: string;

  @IsNumber()
  currentModule: number;

  @IsNumber()
  currentLesson: number;

  @IsArray()
  @IsOptional()
  completedLessons: number[];

  @IsNumber()
  totalLessons: number;

  @IsNumber()
  @IsOptional()
  quizScore: number;

  @IsBoolean()
  @IsOptional()
  finalExamPassed: boolean;

  @IsString()
  @IsOptional()
  startedAt: string;

  @IsString()
  @IsOptional()
  completedAt: string;
}
