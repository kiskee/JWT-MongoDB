import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProgressDto } from './create-userProgress.dto';


export class UpdateUserProgressDto extends PartialType(CreateUserProgressDto) {}
