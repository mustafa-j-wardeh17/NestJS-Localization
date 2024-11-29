# NestJS i18n Localization Library

The **i18n library for NestJS** is your go-to solution for multi-language support in NestJS applications. It simplifies the process of translating HTTP exceptions, validation errors, and even database fields into multiple languages, making your application accessible and user-friendly.

With features like customizable resolvers and loaders, this library is both **flexible** and **easy to use**, empowering you to deliver a tailored experience for users across the globe.

### Why Choose nestjs-i18n?
- **Seamless Integration**: Works out of the box with NestJS modules and decorators.
- **Customizable**: Configure your own resolvers and loaders to suit any use case.
- **Versatile**: Translate HTTP exceptions, DTO validation messages, and MongoDB documents.
- **Community-Driven**: Built on robust tools like `nestjs-i18n` and `mongoose-i18n-localize`.


## Quick Start Guide
### Installation
Install the required package:
```bash
npm install --save nestjs-i18n
```

### Setting Up Translation Files
1. Create a folder named `i18n` in the `src` directory of your project.
2. Organize your translations in JSON files inside language-specific folders (`en`, `ar`, etc.). Example structure:
```
package.json
package-lock.json
src/
├── i18n/
│   ├── en/
│   │   ├── events.json
│   │   └── test.json
│   └── ar/
│       ├── events.json
│       └── test.json
```
3. Important: Ensure the `i18n` folder is included in the build process. Modify `nest-cli.json` as follows:
```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": [
      { "include": "i18n/**/*", "watchAssets": true }
    ]
  }
}
```
---
### Configuration in `AppModule`
To initialize the library, add the following to `AppModule`:
```typescript
import { I18nModule, QueryResolver, AcceptLanguageResolver, HeaderResolver, CookieResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ar', // Default language
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // ?lang=ar
        AcceptLanguageResolver,                   // Accept-Language header
        new HeaderResolver(['x-lang']),           // x-lang header
        new CookieResolver(),                     // lang cookie
      ],
    }),
  ],
})
export class AppModule {}
```

### Using a Custom Translator Service
To streamline translation logic in services, create a reusable translator service:
```typescript
import { Injectable } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class CustomI18n {
  constructor(private readonly i18n: I18nService) {}

  translate(key: string, options?: any) {
    const lang = I18nContext.current().lang;
    return this.i18n.t(key, { lang, ...options });
  }
}
```
***Example Usage***
Instead of writing:
```typescript
throw new HttpException(this.i18n.t('events.EXISTS_EMAIL', { lang: I18nContext.current().lang }), 409);
```
You can simplify it:
```typescript
throw new HttpException(this.i18n.t('events.EXISTS_EMAIL', { lang: I18nContext.current().lang }), 409);
```
---
### Use Cases for Localization
1. Translate HTTP Exception Messages
Example of translating exception messages dynamically:
```typescript const user = await this.userModel.findById(id);
if (!user) {
  throw new HttpException(
    this.i18n.translate('events.NOT_FOUND', { args: { id } }),
    404,
  );
}
```
---
2. Translate DTO Validation Messages
Integrate translations into validation messages using class-validator and nestjs-i18n:
```typescript
import { IsNotEmpty, IsEmail, Length, Min, Max } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
  @Length(3, 20, { message: i18nValidationMessage('validation.USERNAME_LENGTH', { min: 3, max: 20 }) })
  username: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
  @IsEmail({}, { message: i18nValidationMessage('validation.EMAIL_NOT_FORMATTED') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
  @Min(18, { message: i18nValidationMessage('validation.AGE_CONTRAINS_MIN', { min: 18 }) })
  @Max(46, { message: i18nValidationMessage('validation.AGE_CONTRAINS_MAX', { max: 46 }) })
  age: number;
}
```
**Update** `main.ts` to globally handle validation errors:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new I18nValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```
3. Save MongoDB Documents with Multi-Language Fields
Install the required plugin:
```bash
npm install mongoose-i18n-localize
```
Modify your schema to support localized fields:

```typescript
@Schema()
export class User {
  @Prop() username: string;
  @Prop({ unique: true }) email: string;

  @Prop({ i18n: true }) address: string; // Supports multiple languages
}
export const UserSchema = SchemaFactory.createForClass(User);
```
Integrate the plugin:

```typescript
import * as MongooseI18n from 'mongoose-i18n-localize';

MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;
      schema.plugin(MongooseI18n, { locales: ['en', 'ar'], defaultLocale: 'en' });
      return schema;
    },
  },
]);
```
Retrieve Localized Data:

```typescript
async findAll(): Promise<User[]> {
  const users = await this.userModel.find();
  return this.userModel.schema.methods.toObjectLocalizedOnly(
    users,
    I18nContext.current().lang,
  );
}
```
---
### Conclusion
With `nestjs-i18n` and `mongoose-i18n-localize`, you can effortlessly add multilingual support to your NestJS applications. This guide covered:

1. Installation and setup.
2. Translating HTTP exceptions and DTO validation messages.
3. Managing multi-language fields in MongoDB.

Enhance your applications by ensuring a seamless experience for users in their preferred languages!
