import {
  Body,
  Controller,
  Post,
  Res,
  Headers,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from '../services/trasactions.service';

@Controller('trasactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleEvent(
    @Body() eventData: any,
    @Headers('x-event-checksum') checksumHeader: string,
  ) {
    console.info("aca lo que me llega de la trans", eventData, checksumHeader)
    await this.transactionsService.processTrasaction(eventData, checksumHeader)
    
    return 'Event received';
  }
}
