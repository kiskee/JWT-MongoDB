import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
   @ApiProperty({
       description: 'email del usuario',
       example: 'juanito@me.com',
       required: true,
     })
     @IsString()
     @IsNotEmpty({ message: 'El email es obligatorio' })
     email: string;
  }