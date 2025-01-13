import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsBoolean, IsOptional, IsString, IsNotEmpty, IsDate } from "class-validator";

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
        required: false,
      })
      @IsBoolean()
      @IsOptional()
      email_verified?: boolean;
    
      @ApiProperty({
        description: 'Apellido del usuario',
        example: 'García',
        required: true,
      })
      @IsString()
      @IsOptional()
      family_name: string;
    
      @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan',
        required: true,
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
        required: true,
      })
      @IsString()
      @IsNotEmpty({ message: 'La foto de perfil es obligatoria' })
      picture: string;
    
      @ApiProperty({
        description: 'ID único del usuario en Google',
        example: '1234567890abcdef',
        required: true,
      })
      @IsString()
      @IsNotEmpty({ message: 'El ID de Google es obligatorio' })
      sub: string;
}