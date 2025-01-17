import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserProgressDto } from '../dto/create-userProgress.dto';
import { UpdateUserProgressDto } from '../dto/update-userProgress.dto';
import { UserProgressService } from '../services/userProgress.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';


@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserProgressDto: CreateUserProgressDto) {
    return this.userProgressService.create(createUserProgressDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: any) {
    return this.userProgressService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserProgressDto: UpdateUserProgressDto) {
    return this.userProgressService.update(id, updateUserProgressDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(id);
  }
}
