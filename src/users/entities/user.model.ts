import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsAlpha, IsEmail, IsStrongPassword } from "class-validator";
import { Document } from "mongoose";

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    address: string;

    @Prop()
    country: string;

    @Prop()
    age:number
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)