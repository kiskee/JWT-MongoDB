import { Module } from '@nestjs/common';
import { EmailController } from './controllers/email.contoller';
import { EmailService } from './services/email.service';

@Module({
  controllers: [EmailController],

  providers: [EmailService],

  imports: [],

  exports: [EmailService],
})
export class EmailModule {}
