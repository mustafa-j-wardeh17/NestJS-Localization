import { IsAlpha, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsAlpha()
    username: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    address: string;

    country: string;
}
