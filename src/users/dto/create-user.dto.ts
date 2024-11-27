import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, Max, Min } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
    @Length(3, 20, { message: i18nValidationMessage('validation.USERNAME_LENGTH', { min: 3, max: 20 }) }) // ARGS directly
    username: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
    @IsEmail({}, { message: i18nValidationMessage('validation.EMAIL_NOT_FORMATTED') })
    email: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
    @IsStrongPassword({}, { message: i18nValidationMessage('validation.PASSWORD') })
    password: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
    @IsString({ message: i18nValidationMessage('validation.ADDRESS') })
    address: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
    @IsString({ message: i18nValidationMessage('validation.COUNTRY') })
    country: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.EMPTY') })
    @IsNumber({}, { message: i18nValidationMessage('validation.AGE_NUMBER') })
    @Min(18, { message: i18nValidationMessage('validation.AGE_CONTRAINS_MIN', { min: 18 }) })
    @Max(46, { message: i18nValidationMessage('validation.AGE_CONTRAINS_MAX', { max: 46 }) })
    age: number;
}