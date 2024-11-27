import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsAlpha, IsEmail, IsStrongPassword } from "class-validator";
import { Document } from "mongoose";

@Schema()
export class User {
    @Prop()
    @IsAlpha()
    username: string;

    @Prop({ unique: true })
    @IsEmail()
    email: string;

    @Prop()
    @IsStrongPassword()
    password: string;

    @Prop()
    address: string;

    @Prop()
    country: string;
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)