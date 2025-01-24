import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty({ message: 'El campo "recipients" es requerido' })
  @IsEmail(
    {},
    {
      each: true,
      message: 'Cada destinatario debe ser un correo electrónico válido',
    },
  )
  recipients: string | string[]; // Puede ser un solo correo o un array de correos

  @IsNotEmpty({ message: 'El campo "subject" es requerido' })
  @IsString({ message: 'El campo "subject" debe ser una cadena de texto' })
  subject: string;

  @IsNotEmpty({ message: 'El campo "template" es requerido' })
  @IsString({ message: 'El campo "template" debe ser una cadena de texto' })
  template: string; // Nombre del template (por ejemplo, "welcome" o "reset-password")

  @IsOptional()
  context?: Record<string, any>; // Datos dinámicos para reemplazar en el template
}
