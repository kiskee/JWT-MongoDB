import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/user.service';
import { User } from '../shemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * Controller for handling user-related API endpoints.
 */
@Controller('users')
export class UsersController {
  /**
   * Injects the application service into the controller.
   * @param usersService - The service responsible for user-related operations.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint to create a new user.
   * @param createUserDto - The data required to create a user.
   * @returns The created user document.
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Endpoint to retrieve all users.
   * @returns An array of all user documents.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllUsers(@GetUser() user: any) {
    return this.usersService.findAllUsers();
  }

  @Get('search/:id')
  async search(@Param('id') id: string): Promise<any> {
    return this.usersService.search(id);
  }

  /**
   * Endpoint to retrieve a specific user by their ID.
   * @param id - The unique identifier of the user.
   * @returns The user document if found.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Endpoint to delete a specific user by their ID.
   * @param id - The unique identifier of the user.
   * @returns A 204 HTTP status code for a successful deletion.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT) // Sends a 204 status code for successful deletions.
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }

  /**
   * Endpoint to update a user's details.
   * @param id - The unique identifier of the user.
   * @param updateUserDto - The fields to update (e.g., username, email, password).
   * @returns The updated user document.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Endpoint to find a user by email.
   * @param email - The email of the user to find.
   * @returns The user document if found.
   */
  @Get('email/:email')
  @UseGuards(JwtAuthGuard)
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
