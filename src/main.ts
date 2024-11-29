import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // Doesn't need to add ValidationPipe because I18nValidationPipe extends it
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),// to use nest-i18n inside DTO Validation
  )

  // To catch dto exception errors and translate it
  app.useGlobalFilters(new I18nValidationExceptionFilter({
    detailedErrors: false, //Just show the error itself not hole details
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
