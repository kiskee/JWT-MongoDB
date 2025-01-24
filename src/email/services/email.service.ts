import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from '../dto/send-email.dto';
import { EmailTemplates } from '../templates/email-templates';

/**
 * EmailService is responsible for handling email-related operations.
 * It provides methods to send emails using nodemailer and supports dynamic templates.
 */
@Injectable()
export class EmailService {
  // Logger instance to log messages for debugging and tracking.
  private readonly logger = new Logger(EmailService.name);

  /**
   * Constructs the EmailService.
   * @param configService - The ConfigService instance to access environment variables.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates and returns a nodemailer transport instance.
   * This method configures the email transporter using environment variables.
   * @returns A nodemailer transport instance.
   */
  private emailTransport() {
    // Retrieve email configuration from environment variables using ConfigService.
    const transporter = nodemailer.createTransport({
      host: `${process.env.GOOGLE_HOST}`,
      port: `${process.env.GOOGLE_PORT}`,
      secure: false,
      auth: {
        user: `${process.env.GOOGLE_EMA}`,
        pass: `${process.env.GOOGLE_PS}`,
      },
    });

    return transporter;
  }

  /**
   * Renders an email template by replacing placeholders with provided context.
   * This method selects the appropriate template and replaces placeholders with actual data.
   * @param template - The name of the template to render (e.g., 'welcome' or 'reset-password').
   * @param context - The data to replace placeholders in the template (e.g., { name: 'John Doe' }).
   * @returns The rendered HTML content as a string.
   * @throws NotFoundException if the template is not found.
   */
  private renderTemplate(
    template: string,
    context: Record<string, any>,
  ): string {
    let html: string;

    // Select the appropriate template based on the template name.
    switch (template) {
      case 'welcome':
        html = EmailTemplates.WELCOME; // Use the welcome template.
        break;
      case 'reset-password':
        html = EmailTemplates.RESET_PASSWORD; // Use the reset-password template.
        break;
      default:
        // Throw an exception if the template is not found.
        throw new NotFoundException('Template not found');
    }

    // Replace placeholders in the template with actual data from the context.
    for (const key in context) {
      const placeholder = `{{${key}}}`; // Placeholder format (e.g., {{name}}).
      html = html.replace(new RegExp(placeholder, 'g'), context[key]); // Replace all occurrences.
    }

    return html; // Return the rendered HTML.
  }

  /**
   * Sends an email using the provided DTO.
   * This method handles the entire email-sending process, including template rendering and error handling.
   * @param dto - The data transfer object containing email details (recipients, subject, template, and context).
   * @throws Error if the email fails to send.
   */
  async sendEmail(dto: SendEmailDto) {
    const { recipients, subject, template, context } = dto;

    // Create a nodemailer transport instance.
    const transport = this.emailTransport();

    // Render the email template using the provided context.
    const html = this.renderTemplate(template, context);

    // Configure the email options.
    const options: nodemailer.SendMailOptions = {
      from: `${process.env.GOOGLE_EMA}`, // Sender's email address.
      to: recipients, // Recipient(s) of the email.
      subject: subject, // Subject of the email.
      html: html, // Rendered HTML content of the email.
    };

    try {
      // Send the email using the configured transport.
      await transport.sendMail(options);

      // Log a success message.
      this.logger.log(`Email sent to ${recipients}`);
    } catch (error) {
      // Log an error message if the email fails to send.
      this.logger.error(`Failed to send email to ${recipients}`, error.stack);

      // Throw an error to indicate the failure.
      throw new Error('Failed to send email');
    }
  }
}
