import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsBoolean,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class GoogleDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@dominio.com',
    required: true,
  })
  @IsEmail({}, { message: 'El correo electrónico proporcionado no es válido' })
  email: string;

  @ApiProperty({
    description: 'Indica si el correo electrónico ha sido verificado',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty({ message: 'El email debe estar verificado' })
  email_verified?: boolean;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'García',
    required: false,
  })
  @IsString()
  @IsOptional()
  family_name: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    required: false,
  })
  @IsString()
  @IsOptional()
  given_name: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan García',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  name: string;

  @ApiProperty({
    description: 'URL de la foto de perfil del usuario',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  picture: string;

  @ApiProperty({
    description: 'ID único del usuario en Google',
    example: '1234567890abcdef',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  sub: string;
}
