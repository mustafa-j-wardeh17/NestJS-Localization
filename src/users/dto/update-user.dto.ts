import { IsAlpha, IsEmail, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsAlpha()
    username?: string;

    @IsEmail()
    email?: string;

    @IsStrongPassword()
    password?: string;

    address?: string;

    country?: string;
}
