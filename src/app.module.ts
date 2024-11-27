import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { UsersModule } from './users/users.module';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:adminpassword@localhost:27017', {
      dbName: 'nest_main',
      autoCreate: true
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ar', // default language
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        // accept lang from query ?lang=ar
        // accept lang from Header Accept-Language=ar
        // accept lang from Custom Header x-lang=ar
        // accept lang from Cookie lang=ar

        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang"]),
        new CookieResolver(),
      ],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
