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
  @HttpCode(HttpStatus.OK)
  async handleEvent(
    @Body() eventData: any,
    @Headers('x-event-checksum') checksumHeader: string,
  ) {
    await this.transactionsService.processTrasaction(eventData, checksumHeader);
    return 'Event received';
  }

  @Post('/find/value')
  @UseGuards(JwtAuthGuard)
  async findBy(@Body() data: any) {
    return await this.transactionsService.findTransactionBy(
      data.field,
      data.value,
    );
  }
}
