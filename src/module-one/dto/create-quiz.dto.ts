import { IsString, IsArray, ValidateNested, IsInt, ArrayMinSize, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class QuizQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @ArrayMinSize(2)
  options: string[];

  @IsInt()
  correctAnswer: number;
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}

export class UpdateQuizDto extends CreateQuizDto {}
