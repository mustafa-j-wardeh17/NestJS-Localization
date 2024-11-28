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

//------------------------------------------
    @Prop({
        i18n: true
    })
    address: string;
    // in db it will be like this
    // address:{
    //     en:"",
    //     ar:""
    // }
//------------------------------------------


//------------------------------------------
    @Prop({
        i18n: true
    })
    country: string;
    // in db it will be like this
    // country:{
    //     en:"",
    //     ar:""
    // }
//------------------------------------------

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