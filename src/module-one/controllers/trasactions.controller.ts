import {
  Body,
  Controller,
  Post,
  Res,
  Headers,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from '../services/trasactions.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

/**
 * TransactionsController handles HTTP requests related to transactions.
 * It provides endpoints for processing transaction events and finding transactions by specific criteria.
 * Some routes are protected by JWT authentication.
 */
@Controller('trasactions')
export class TransactionsController {
  /**
   * Constructor to inject the TransactionsService dependency.
   * @param transactionsService Instance of TransactionsService used to perform transaction-related operations.
   */
  constructor(private readonly transactionsService: TransactionsService) {}

  /**
   * Handles incoming transaction events.
   * This endpoint processes the event data and validates it using the provided checksum.
   * @param eventData The event data received in the request body.
   * @param checksumHeader The checksum header (`x-event-checksum`) used for validation.
   * @returns A confirmation message indicating that the event was received.
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async handleEvent(
    @Body() eventData: any,
    @Headers('x-event-checksum') checksumHeader: string,
  ) {
    await this.transactionsService.processTrasaction(eventData, checksumHeader);
    return 'Event received';
  }

  /**
   * Finds transactions based on a specific field and value.
   * This endpoint is protected by JWT authentication.
   * @param data An object containing the field and value to search for.
   * @returns A list of transactions matching the specified criteria.
   */
  @Post('/find/value')
  @UseGuards(JwtAuthGuard)
  async findBy(@Body() data: any) {
    return await this.transactionsService.findTransactionBy(
      data.field,
      data.value,
    );
  }
}
