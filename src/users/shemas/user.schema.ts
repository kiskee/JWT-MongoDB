import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Expresión regular para validar correos electrónicos
      'El correo electrónico proporcionado no es válido', // Mensaje personalizado
    ],
  })
  email: string;

  @Prop()
  email_verified: boolean;

  @Prop({})
  family_name: string;

  @Prop({})
  given_name: string;

  @Prop({ required: true })
  name: string;

  @Prop({})
  picture: string;

  @Prop({ unique: true })
  sub: string;

  @Prop({ unique: true })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

/**
 {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Expresión regular para validar correos electrónicos
      'El correo electrónico proporcionado no es válido', // Mensaje personalizado
    ],
  })
  email: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
 */
