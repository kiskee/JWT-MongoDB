import {
  Body,
  Controller,
  Post,
  Res,
  Headers,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from '../services/trasactions.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('trasactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleEvent(
    @Body() eventData: any,
    @Headers('x-event-checksum') checksumHeader: string,
    @GetUser() user: any
  ) {
    console.log("entre al controllador", user)
    await this.transactionsService.processTrasaction(eventData, checksumHeader, user);
    return 'Event received';
  }
}
