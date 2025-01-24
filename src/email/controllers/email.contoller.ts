import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../dto/send-email.dto';

/**
 * EmailController is responsible for handling email-related HTTP requests.
 * It provides endpoints for sending emails using the EmailService.
 */
@Controller('email')
export class EmailController {
  /**
   * Constructs the EmailController.
   * @param emailService - An instance of the EmailService to handle email operations.
   */
  constructor(private readonly emailService: EmailService) {}

  /**
   * Endpoint to send an email.
   * This endpoint accepts a SendEmailDto object in the request body,
   * processes it, and sends an email using the EmailService.
   *
   * @param dto - The data transfer object containing email details (recipients, subject, template, and context).
   * @returns A success message if the email is sent successfully.
   * @throws HttpException with a 500 status code if an error occurs during email sending.
   */
  @Post('send')
  async sendMail(@Body() dto: SendEmailDto) {
    try {
      // Attempt to send the email using the EmailService.
      await this.emailService.sendEmail(dto);
      // Return a success message if the email is sent successfully.
      return { message: 'Email sent successfully' };
    } catch (error) {
      // If an error occurs, log it and throw an HttpException with a 500 status code.
      throw new HttpException(
        'Failed to send email: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
