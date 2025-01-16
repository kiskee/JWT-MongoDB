import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    required: false,
  })
  @IsBoolean()
  @IsOptional()
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
    required: false,
  })
  @IsString()
  @IsOptional()
  sub: string;

  @ApiProperty({
    description:
      'The password for the user (must include uppercase, lowercase, number, and special character)',
    example: 'Hello@123',
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}
