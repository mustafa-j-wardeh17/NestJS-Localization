import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { CustomI18n } from 'src/util/i18nMiddleware';

//For migrate localiza plugin
import * as MongooseI18n from 'mongoose-i18n-localize'

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])

    MongooseModule.forFeatureAsync([{
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.plugin(MongooseI18n, {
          locales: ['en', 'ar'],
          defaultLocale: 'en'
        })
        return schema
      }
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService, CustomI18n],
})
export class UsersModule { }
