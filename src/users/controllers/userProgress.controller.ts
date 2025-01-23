import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserProgressDto } from '../dto/create-userProgress.dto';
import { UpdateUserProgressDto } from '../dto/update-userProgress.dto';
import { UserProgressService } from '../services/userProgress.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

/**
 * UserProgressController handles HTTP requests related to user progress.
 * It provides endpoints for creating, retrieving, updating, and deleting user progress records.
 * All routes are protected by JWT authentication.
 */
@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  /**
   * Creates a new user progress record.
   * @param createUserProgressDto Data Transfer Object containing the user progress details.
   * @returns The newly created user progress record.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserProgressDto: CreateUserProgressDto) {
    return this.userProgressService.create(createUserProgressDto);
  }

  /**
   * Retrieves all user progress records.
   * @returns A list of all user progress records.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: any) {
    return this.userProgressService.findAll();
  }

  /**
   * Retrieves a specific user progress record by its ID.
   * @param id The ID of the user progress record to retrieve.
   * @returns The user progress record with the specified ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(id);
  }

  /**
   * Updates a specific user progress record by its ID.
   * @param id The ID of the user progress record to update.
   * @param updateUserProgressDto Data Transfer Object containing the updated user progress details.
   * @returns The updated user progress record.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ) {
    return this.userProgressService.update(id, updateUserProgressDto);
  }

  /**
   * Deletes a specific user progress record by its ID.
   * @param id The ID of the user progress record to delete.
   * @returns A confirmation that the user progress record has been deleted.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(id);
  }
}
