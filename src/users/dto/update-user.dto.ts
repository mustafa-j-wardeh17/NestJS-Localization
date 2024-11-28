import {IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Max, Min } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(3, 20, { message: i18nValidationMessage('validation.USERNAME_LENGTH', { min: 3, max: 20 }) }) // ARGS directly
    username?: string;

    @IsOptional()
    @IsEmail({}, { message: i18nValidationMessage('validation.EMAIL_NOT_FORMATTED') })
    email?: string;

    @IsOptional()
    @IsStrongPassword({}, { message: i18nValidationMessage('validation.PASSWORD') })
    password?: string;

    @IsOptional()
    @IsString({ message: i18nValidationMessage('validation.ADDRESS') })
    address?: string;

    @IsOptional()
    @IsString({ message: i18nValidationMessage('validation.COUNTRY') })
    country?: string;

    @IsOptional()
    @IsNumber({}, { message: i18nValidationMessage('validation.AGE_NUMBER') })
    @Min(18, { message: i18nValidationMessage('validation.AGE_CONTRAINS_MIN', { min: 18 }) })
    @Max(46, { message: i18nValidationMessage('validation.AGE_CONTRAINS_MAX', { max: 46 }) })
    age?: number
}
