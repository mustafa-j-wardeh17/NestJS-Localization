import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//for plugin
//import * as MongooseI18n from 'mongoose-i18n-localize'

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
    age: number
}


export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)

// You can migrate plugins inside entity or inside module
// -------------------------------------
// ------------First Way----------------
// -------------------------------------

// const UserSchema = SchemaFactory.createForClass(User)

// UserSchema.plugin(MongooseI18n, {
//     locales: ['en', 'de']
// });

// export { UserSchema }